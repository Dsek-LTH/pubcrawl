// src/routes/custom-event/+server.js
import { produce } from "sveltekit-sse";

/**
 * @param {number} milliseconds
 * @returns
 */
function delay(milliseconds) {
  return new Promise(function run(resolve) {
    setTimeout(resolve, milliseconds);
  });
}

export function POST() {
  return produce(async function start({ emit }) {
    while (true) {
      const { error } = emit("message", `the time is ${Date.now()}`);
      if (error) {
        return;
      }
      await delay(1000);
    }
  });
}
