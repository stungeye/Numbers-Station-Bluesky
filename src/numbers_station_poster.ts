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

  private runCommand(
    command: string,
    args: string[],
    input?: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args);
      let output = "";
      let errorOutput = "";

      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(
            new Error(`Command failed: ${command}. Error: ${errorOutput}`)
          );
        }
      });
    });
  }

  private getAudioToolArgs(
    language: string,
    message: string,
    outputPath: string
  ): [string, string[]] {
    if (language === "morse") {
      // Define a regular expression to extract valid Morse code
      const morseRegex = /(?:\n)([.\- ]+)(?:\n)/;
      const match = message.match(morseRegex);

      // If no valid Morse code is found, throw an error
      if (!match || match.length < 2) {
        throw new Error("No valid Morse code found in the message.");
      }

      // Extract the valid Morse code
      const morse = match[1].trim();

      this.log(`Morse code: ${morse}`);
      // Map Morse code symbols to tones using SoX
      const morseToneMap: Record<
        string,
        { frequency: number; duration: number }
      > = {
        ".": { frequency: 700, duration: 0.1 }, // Dot: 100ms
        "-": { frequency: 700, duration: 0.3 }, // Dash: 300ms
        " ": { frequency: 0, duration: 0.2 }, // Pause between symbols: 200ms
      };

      // Convert the valid Morse code into a SoX synth command sequence
      const soxCommands = morse
        .split("")
        .map((symbol) => {
          const { frequency, duration } = morseToneMap[symbol] || {
            frequency: 0,
            duration: 0.2,
          };
          return frequency > 0
            ? `synth ${duration} sine ${frequency}`
            : `synth ${duration} sine 0`; // Silence for spaces
        })
        .join(" : ");

      // Return the SoX command to generate Morse code directly into the output WAV file
      return ["sox", ["-n", outputPath, ...soxCommands.split(" ")]];
    }

    const speed = 100; // Default speech rate for espeak in WPM
    return [
      "espeak",
      ["-v", language, "-s", speed.toString(), "-w", outputPath, message],
    ];
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

    // Step 1: Extract the duration of the input WAV file
    const duration = await this.getAudioDuration(inputWavPath);

    // Step 2: Mix the static noise with the input WAV file
    await this.runCommand("ffmpeg", [
      "-i",
      inputWavPath,
      "-f",
      "lavfi",
      "-i",
      `aevalsrc=random(0):s=44100:d=${duration}`,
      "-filter_complex",
      "[1:a]volume=0.05[noise];[0:a][noise]amix=inputs=2:duration=first[audio_out]",
      "-map",
      "[audio_out]",
      "-shortest",
      mixedWavPath,
    ]);

    return mixedWavPath;
  }

  private async getAudioDuration(filePath: string): Promise<number> {
    this.log(`Getting duration of file: ${filePath}`);

    const output = await this.runCommand("ffprobe", [
      "-i",
      filePath,
      "-show_entries",
      "format=duration",
      "-v",
      "quiet",
      "-of",
      "csv=p=0",
    ]);

    return parseFloat(output);
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
