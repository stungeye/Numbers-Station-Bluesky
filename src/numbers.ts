import { NumbersStationPost } from "./numbers_station_poster";

export class CrypticSignal {
  FREQUENCIES: number[];
  INTERVALS: number[];
  PHONETIC_SYSTEM_LANGUAGES: { [key: string]: string };
  PHONETIC_SYSTEMS: { [key: string]: string[] };
  PREFIXES: string[];
  SUFFIXES: string[];
  PATTERNS: { [key: string]: number[] };
  MORSE_CODE: { [key: string]: string };
  MORSE_WORDS: {
    SUBJECTS: string[];
    VERBS: string[];
    OBJECTS: string[];
    LOCATIONS: string[];
    MODIFIERS: string[];
  };

  constructor() {
    this.FREQUENCIES = [4625, 4780, 5473, 6998, 7887];
    this.INTERVALS = [23, 37, 73, 89, 197];
    this.PHONETIC_SYSTEM_LANGUAGES = {
      ALPHA: "en",
      BETA: "de",
      GAMMA: "it",
      PILOT: "en",
      RUSSIAN: "ru",
      CHINESE: "zh",
    };
    this.PHONETIC_SYSTEMS = {
      ALPHA: [
        "ANNA",
        "BELLA",
        "CESAR",
        "DAVID",
        "EVA",
        "FELIX",
        "GUSTAV",
        "HENRI",
        "IVAN",
        "JOHN",
      ],
      BETA: [
        "NULL",
        "EINS",
        "ZWEI",
        "DREI",
        "VIER",
        "FÜNF",
        "SECHS",
        "SIEBEN",
        "ACHT",
        "NEUN",
      ],
      GAMMA: [
        "NULLA",
        "UNO",
        "DEUX",
        "TRES",
        "QUATRE",
        "CINQUE",
        "SEIS",
        "SEPT",
        "OCT",
        "NOVE",
      ],
      PILOT: [
        "ZERO",
        "ONE",
        "TWO",
        "TREE",
        "FOWER",
        "FIFE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINER",
      ],
      RUSSIAN: [
        "НОЛЬ", // ZERO
        "ОДИН", // ONE
        "ДВА", // TWO
        "ТРИ", // THREE
        "ЧЕТЫРЕ", // FOUR
        "ПЯТЬ", // FIVE
        "ШЕСТЬ", // SIX
        "СЕМЬ", // SEVEN
        "ВОСЕМЬ", // EIGHT
        "ДЕВЯТЬ", // NINE
      ],
      CHINESE: [
        "零", // ZERO
        "一", // ONE
        "二", // TWO
        "三", // THREE
        "四", // FOUR
        "五", // FIVE
        "六", // SIX
        "七", // SEVEN
        "八", // EIGHT
        "九", // NINE
      ],
    };
    this.PREFIXES = [
      "ZELENYY KRISTALL",
      "SKRYTAYA NOCH",
      "TUNGUSKA",
      "ELEKTRICHESKIY VETER",
      "LEVIATHAN",
      "ISKHOD",
      "LUNNAYA STANTSIYA",
      "KOSMICHESKAYA TISHINA",
      "ZVONOK IZ GLUBIN",
      "RADIOFON",
      "AKUSTICHESKAYA TEN'",
      "POLYARNYY SIGNAL",
      "KHIMICHESKIY SLED",
      "KONTROL'NAYA TOCHKA",
      "SVETLYY KOD",
      "NOCHNOY MAYAK",
      "ISKUSSTVENNYY VZGLYAD",
      "KRISTALICHESKIY POTOK",
      "DZERKAL'NYY EFEKT",
      // New Chinese Entries
      "天狼星", // SIRIUS
      "黑洞信号", // BLACK HOLE SIGNAL
      "宇宙灯塔", // COSMIC LIGHTHOUSE
      "银河之声", // VOICE OF THE GALAXY
      "远星探测", // DISTANT STAR PROBE
      // New Russian Cyrillic Entries
      "ЗВЕЗДНЫЙ МАЯК", // STELLAR BEACON
      "ТАЙНАЯ ОРБИТА", // SECRET ORBIT
      "ГЛУБИННЫЙ ЭФИР", // DEEP ETHER
      "КОСМИЧЕСКИЙ ШТОРМ", // COSMIC STORM
      "ПРОЗРАЧНЫЙ ПАТТЕРН", // TRANSPARENT PATTERN
    ];
    this.SUFFIXES = [
      "TISHINA",
      "RADIOMAYAK",
      "PECHALNYY ANGEL",
      "VOID",
      "KONTAKT",
      "ZVUKOVAYA TEN'",
      "POLYARNAYA SHIROTA",
      "MEKHANICHESKIY OTZVUK",
      "KODOVAYA TEN'",
      "ZONA MOLCHANIYA",
      "VYKHODNOY POTOK",
      "KOZMIKA",
      "SIGMA",
      "DELTA",
      "ANTENNA",
      "KONTROL'NAYA ZONA",
      "NOCHNOY SIGNAL",
      "EHO DAL'NOSTI",
      "SVETOVOY KONTUR",
      // New Chinese Entries
      "静默之域", // DOMAIN OF SILENCE
      "深空回声", // DEEP SPACE ECHO
      "终极信标", // ULTIMATE BEACON
      "未知频率", // UNKNOWN FREQUENCY
      "无限回响", // INFINITE RESONANCE
      // New Russian Cyrillic Entries
      "ТЕНЬ РЕЗОНАНСА", // SHADOW OF RESONANCE
      "ГЛУБИНЫ ПРОСТРАНСТВА", // DEPTHS OF SPACE
      "СЕКРЕТНЫЙ МАЯК", // SECRET BEACON
      "ЧЕРНОЕ ЗЕРКАЛО", // BLACK MIRROR
      "ПУСТОТА СИГНАЛА", // VOID SIGNAL
    ];
    this.PATTERNS = {
      PRIPYAT: [3, 7, 3, 7, 2, 3],
      DUGA: [5, 5, 9, 9],
      ZVENO: [1, 1, 2, 3, 5, 8],
      CHAOS: [2, 3, 5, 7],
    };
    this.MORSE_CODE = {
      A: ".-",
      B: "-...",
      C: "-.-.",
      D: "-..",
      E: ".",
      F: "..-.",
      G: "--.",
      H: "....",
      I: "..",
      J: ".---",
      K: "-.-",
      L: ".-..",
      M: "--",
      N: "-.",
      O: "---",
      P: ".--.",
      Q: "--.-",
      R: ".-.",
      S: "...",
      T: "-",
      U: "..-",
      V: "...-",
      W: ".--",
      X: "-..-",
      Y: "-.--",
      Z: "--..",
      "0": "-----",
      "1": ".----",
      "2": "..---",
      "3": "...--",
      "4": "....-",
      "5": ".....",
      "6": "-....",
      "7": "--...",
      "8": "---..",
      "9": "----.",
    };
    this.MORSE_WORDS = {
      SUBJECTS: [
        "LIGHTHOUSE",
        "OBSERVER",
        "SENTINEL",
        "OPERATOR",
        "WATCHER",
        "SLEEPER",
        "SIGNAL",
        "BEACON",
        "ANOMALY",
        "SHADOW",
        "GUARDIAN",
        "LISTENER",
        "MESSENGER",
        "DRIFTER",
        "OUTPOST",
        "PROWLER",
        "VIGIL",
        "SHADE",
        "MONITOR",
        "LOOKOUT",
      ],
      VERBS: [
        "AWAITS",
        "WATCHES",
        "LISTENS",
        "SIGNALS",
        "TRANSMITS",
        "ECHOES",
        "FADES",
        "EMERGES",
        "PERSISTS",
        "RESONATES",
        "WHISPERS",
        "CARRIES",
        "DISSOLVES",
        "FALLS",
        "RIPPLES",
        "ASCENDS",
        "RETREATS",
        "PIERCES",
        "PROCLAIMS",
        "WAVES",
      ],
      OBJECTS: [
        "FREQUENCY",
        "DARKNESS",
        "STATIC",
        "SILENCE",
        "VOID",
        "SIGNAL",
        "PATTERN",
        "CIPHER",
        "PULSE",
        "BROADCAST",
        "TRANSMISSION",
        "ECHO",
        "WAVE",
        "MESSAGE",
        "CODE",
        "SHADOW",
        "SPECTRUM",
        "HORIZON",
        "DISTURBANCE",
        "WHIRL",
      ],
      LOCATIONS: [
        "BEYOND",
        "BENEATH",
        "WITHIN",
        "BELOW",
        "ABOVE",
        "NOWHERE",
        "EVERYWHERE",
        "BETWEEN",
        "AROUND",
        "THROUGH",
        "OUTSIDE",
        "INSIDE",
        "ACROSS",
        "UNDER",
        "WITHIN REACH",
        "IN THE DEPTHS",
        "AT THE EDGE",
        "NEARBY",
        "FAR AWAY",
        "AT MIDPOINT",
      ],
      MODIFIERS: [
        "ENDLESS",
        "ETERNAL",
        "SILENT",
        "HIDDEN",
        "UNKNOWN",
        "DISTANT",
        "ANCIENT",
        "SECRET",
        "COSMIC",
        "FORGOTTEN",
        "VEILED",
        "BOUNDLESS",
        "OBSCURED",
        "UNSEEN",
        "MYSTERIOUS",
        "ENIGMATIC",
        "LOST",
        "MURMURING",
        "WANDERING",
        "FADING",
      ],
    };
  }

  textToMorse(text: string): string {
    return text
      .toUpperCase()
      .split("")
      .map((char) => this.MORSE_CODE[char] || char)
      .join(" ");
  }

  generateNumberStationOutput(): string {
    const randomGroup = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

    const repeatGroup = (group: string, times = 2) =>
      Array(times).fill(group).join(" ");

    const patterns = [
      [5, 5, 2, 3, 2, 3, 2, 5, 5],
      [5, 3, 5, 3, 3, 3, 3, 3, 5, 3, 5],
      [3, 5, 2, 1, 2, 2, 1, 2, 5, 3],
      [3, 5, 3, 5, 5, 5, 5, 5, 3, 5, 3],
      [1, 1, 2, 3, 5, 8, 13],
    ];

    const pattern = patterns[Math.floor(Math.random() * patterns.length)];

    // Generate groups based on the pattern
    const groups = pattern.map((length) => {
      const group = randomGroup(length);
      return repeatGroup(group, Math.random() < 0.5 ? 2 : 3);
    });

    // Join groups with " – " separators and optionally append a final zero group
    let output = groups.join(" – ");
    if (Math.random() < 0.75) {
      output += " – 000 00";
      if (Math.random() < 0.5) {
        output += "0";
      }
    }

    return output;
  }

  generateMorseMessage(): string {
    const messageStructures: string[][] = [
      ["SUBJECTS", "VERBS", "OBJECTS"],
      ["MODIFIERS", "OBJECTS", "VERBS"],
      ["SUBJECTS", "VERBS", "LOCATIONS"],
      ["MODIFIERS", "SUBJECTS", "VERBS", "OBJECTS"],
      ["SUBJECTS", "VERBS", "MODIFIERS", "OBJECTS"],
      ["MODIFIERS", "OBJECTS", "LOCATIONS", "VERBS"],
    ];

    const getRandomWord = (category: keyof typeof this.MORSE_WORDS): string => {
      const words = this.MORSE_WORDS[category];
      return words[Math.floor(Math.random() * words.length)];
    };

    const structure =
      messageStructures[Math.floor(Math.random() * messageStructures.length)];

    const message = structure
      .map((category) =>
        getRandomWord(category as keyof typeof this.MORSE_WORDS)
      )
      .join(" ");

    return this.textToMorse(message);
  }

  generateStationId(): string {
    const prefix =
      this.PREFIXES[Math.floor(Math.random() * this.PREFIXES.length)];
    const number = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0");
    const suffix =
      this.SUFFIXES[Math.floor(Math.random() * this.SUFFIXES.length)];
    return `${prefix}-${number}-${suffix}`;
  }

  generateMessage(): [string, string] {
    const patternKey = Object.keys(this.PATTERNS)[
      Math.floor(Math.random() * Object.keys(this.PATTERNS).length)
    ];
    const pattern = this.PATTERNS[patternKey];

    const systemKey = Object.keys(this.PHONETIC_SYSTEMS)[
      Math.floor(Math.random() * Object.keys(this.PHONETIC_SYSTEMS).length)
    ];
    const system = this.PHONETIC_SYSTEMS[systemKey];

    const groups = pattern.map((num) => {
      const digits = Array(num)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10));
      return digits.map((d) => system[d]).join(" ");
    });

    return [groups.join("\n"), this.PHONETIC_SYSTEM_LANGUAGES[systemKey]];
  }

  generateBroadcast(): NumbersStationPost {
    const frequency =
      this.FREQUENCIES[Math.floor(Math.random() * this.FREQUENCIES.length)];
    const interference = this.generateInterference();

    const includeCount = Math.random() < 0.3;
    const includeReverse = Math.random() < 0.2;
    const includeMarkers = Math.random() < 0.25;
    const includeMorse = Math.random() < 0.35;

    const broadcast = [
      `${interference}\n`,
      `FREQUENCY: ${frequency}kHz`,
      `TIME: ${this.generateTimestamp()}`,
      `STATION: ${this.generateStationId()}`,
      "",
    ];

    let messages = [
      this.generateMessage(),
      [this.generateNumberStationOutput(), "en"],
      [this.generateMorseMessage(), "morse"],
    ];

    messages.push([
      messages[0][0].split("\n").reverse().join("\n"),
      messages[0][1],
    ]);
    messages.push([
      messages[1][0].split(" – ").reverse().join(" – "),
      messages[1][1],
    ]);

    const selected = messages[Math.floor(Math.random() * messages.length)];
    broadcast.push(selected[0]);

    let preMessage = broadcast.join("\n");
    if (preMessage.length + interference.length < 295) {
      preMessage += "\n\n" + interference;
    }

    return { message: preMessage, language: selected[1] };
  }

  generateMarkers(): string {
    const count =
      this.INTERVALS[Math.floor(Math.random() * this.INTERVALS.length)];
    return Array(3)
      .fill(0)
      .map(() => "β".repeat(count % 7))
      .join(" ");
  }

  generateTimestamp(): string {
    const now = new Date();
    const hour = now.getUTCHours().toString().padStart(2, "0");
    const minute = now.getUTCMinutes().toString().padStart(2, "0");
    return `${hour}${minute}Z`;
  }

  generateInterference(): string {
    return Array(2 + Math.floor(Math.random() * 4))
      .fill(0)
      .map(() => "/" + "⁂ » ".repeat(Math.floor(Math.random() * 5)))
      .join("");
  }
}

/*
const cs = new CrypticSignal();
const broadcast = cs.generateBroadcast();
console.log(broadcast);
console.log("Character Count: ", broadcast.length);
*/
