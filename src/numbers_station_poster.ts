import { BskyAgent } from "@atproto/api";
import { spawn } from "child_process";
import path from "path";

export interface NumbersStationPost {
  message: string;
  language: string;
}

class NumbersStationPoster {
  private agent: BskyAgent;
  private log: (message: string) => void;

  constructor(agent: BskyAgent, log: (message: string) => void) {
    this.agent = agent;
    this.log = log;
  }

  private runCommand(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args);
      let errorOutput = "";

      process.stderr.on("data", (data) => (errorOutput += data.toString()));
      process.on("close", (code) =>
        code === 0
          ? resolve()
          : reject(
              new Error(`Command failed: ${command}. Error: ${errorOutput}`)
            )
      );
    });
  }

  private getAudioToolArgs(
    language: string,
    message: string,
    outputPath: string
  ): [string, string[]] {
    if (language === "morse") {
      return ["cw", ["-w", outputPath, message]];
    }
    return ["espeak", ["-v", language, "-w", outputPath, message]];
  }

  private getFilePath(extension: string, type: string): string {
    return path.join(__dirname, `${type}_${Date.now()}.${extension}`);
  }

  private async generateWav(post: NumbersStationPost): Promise<string> {
    const wavPath = this.getFilePath("wav", "initial");
    const [command, args] = this.getAudioToolArgs(
      post.language,
      post.message,
      wavPath
    );

    this.log(`Generating WAV file for language: ${post.language}`);
    await this.runCommand(command, args);
    return wavPath;
  }

  private async mixWithStatic(inputWavPath: string): Promise<string> {
    const mixedWavPath = this.getFilePath("wav", "static");

    this.log("Mixing WAV file with static noise");
    await this.runCommand("ffmpeg", [
      "-f",
      "wav",
      "-i",
      inputWavPath,
      "-f",
      "lavfi",
      "-i",
      "aevalsrc=random(0):s=44100:d=5",
      "-filter_complex",
      "[1:a]volume=0.05[noise];[0:a][noise]amix=inputs=2:duration=first[audio_out]",
      "-map",
      "[audio_out]",
      "-shortest",
      mixedWavPath,
    ]);

    return mixedWavPath;
  }

  private async convertToMp4WithSpectrum(wavPath: string): Promise<string> {
    const mp4Path = this.getFilePath("mp4", "video");

    this.log("Converting WAV to MP4 with spectrum visualization");
    await this.runCommand("ffmpeg", [
      "-i",
      wavPath,
      "-filter_complex",
      "showspectrum=s=1280x720:mode=separate:color=intensity,format=yuv420p[v]",
      "-map",
      "[v]",
      "-map",
      "0:a",
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-shortest",
      mp4Path,
    ]);

    return mp4Path;
  }

  async postToBluesky(post: NumbersStationPost): Promise<void> {
    try {
      this.log("Starting Bluesky post process");

      // Step 1: Generate WAV
      const wavPath = await this.generateWav(post);
      this.log(`Generated WAV file: ${wavPath}`);

      // Step 2: Mix WAV with static noise
      const mixedWavPath = await this.mixWithStatic(wavPath);
      this.log(`Mixed WAV file with static: ${mixedWavPath}`);

      // Step 3: Convert WAV to MP4 with spectrum visualization
      const mp4Path = await this.convertToMp4WithSpectrum(mixedWavPath);
      this.log(`Generated MP4 file with spectrum: ${mp4Path}`);

      // Step 4: Post to Bluesky
      /*
      await this.agent.post({
        text: post.message,
        embed: {
          $type: "app.bsky.embed.external",
          external: {
            uri: `file://${mp4Path}`,
            title: `Numbers Station: ${post.language}`,
            description: post.message,
          },
        },
      });
      */

      this.log("Successfully posted to Bluesky");
    } catch (error) {
      this.log(
        `Error during posting: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw error;
    }
  }
}

export default NumbersStationPoster;
