// Runs after `vale sync` (package.json `setup`): applies DM-confirmed exceptions to the downloaded ai-tells package,
// which is not committed. Idempotent. Each entry was confirmed by the DM as a misfire on literal campaign meaning.
import { readFileSync, writeFileSync } from "node:fs";

const patches: { file: string; exception: string }[] = [
  // The DM is a person: "the DM asks for", "the DM decides".
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bDMs?\\b"` },
  // "them" is the person pronoun the teaching span keeps ("the sages teach them"): the DM-confirmed misfire,
  // where grung sages teach their people in the world. "him" and "her" are already excepted; "them" was not.
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bthem\\b"` },
  // The Party, the Players' characters, are people: "the Party answers with cover".
  { file: ".vale/styles/ai-tells/AnthropomorphicCognition.yml", exception: String.raw`  - "(?i)\\bpart(?:y|ies)\\b"` },
];

for (const { file, exception } of patches) {
  const text = readFileSync(file, "utf8");
  if (text.includes(exception)) continue;
  if (!/^exceptions:\n/m.test(text)) throw new Error(`${file}: no exceptions list to patch`);
  writeFileSync(file, text.replace(/^exceptions:\n/m, `exceptions:\n${exception}\n`));
}
