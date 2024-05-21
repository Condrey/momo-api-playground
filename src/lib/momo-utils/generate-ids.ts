// utils/numbers.js

import crypto from "crypto";

export function generateIds(userId: string): number[] {
  const count = 2;
  const fixedNumbers: Set<number> = new Set();
  const seed = userId;
  for (let i = 0; i < count; i++) {
    const hash: string = crypto
      .createHash("sha256")
      .update(seed + i)
      .digest("hex");
    const fixedNumber: number = parseInt(hash.substring(0, 16), 16);
    fixedNumbers.add(fixedNumber);
  }
  return Array.from(fixedNumbers);
}
