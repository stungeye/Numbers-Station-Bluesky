import { BskyAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { CrypticSignal } from "./numbers";

// Load environment variables from .env file
dotenv.config();

// Ensure logs directory exists
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Setup logging
const logFile = path.join(
  logsDir,
  `bot-${new Date().toISOString().split("T")[0]}.log`
);
const log = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(message);
};

const agent = new BskyAgent({
  service: "https://bsky.social",
});

async function main() {
  try {
    // Validate environment variables
    const username = process.env.BLUESKY_USERNAME;
    const password = process.env.BLUESKY_PASSWORD;

    if (!username || !password) {
      throw new Error("Missing required environment variables");
    }

    const rnd = Math.random();

    if (rnd > 0.03) {
      log(`No luck this time! ${rnd}`);
      return;
    }

    await agent.login({
      identifier: username,
      password: password,
    });

    log(`Successfully logged in to Bluesky! ${rnd}`);

    const cs = new CrypticSignal();
    const [broadcast, language] = cs.generateBroadcast();

    // Language isn't one of the following: en, it, de, ru, zh, morse
    if (!["en", "it", "de", "ru", "zh", "morse"].includes(language)) {
      log(`Invalid language: ${language}`);
      return;
    } else {
      log(`Language: ${language}`);
    }

    log(broadcast);
    log(`Character Count: ${broadcast.length}`);

    if (broadcast.length < 299) {
      await agent.post({
        text: broadcast,
      });
    } else {
      await agent.post({
        text: "Ready? Ready?",
      });
    }

    console.log("Just posted!");
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    // Exit with error code for cron to detect failure
    process.exit(1);
  }
}

// Proper error handling for uncaught errors
process.on("uncaughtException", (error) => {
  log(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  log(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

main();
