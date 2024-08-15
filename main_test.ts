import { assertEquals } from "@std/assert";
import { initializeRows, preRender, renderString } from "./main.ts";
import { alphabet, charHeight } from "./letters.ts";

Deno.test("initializeRows test", () => {
  const result = initializeRows();
  assertEquals(result.length, charHeight);
  for (let i = 0; i < charHeight; i++) {
    assertEquals(result[i], []);
  }
});

Deno.test("preRender test with single character", () => {
  const rows = initializeRows();
  const result = preRender("A", rows);
  assertEquals(result.length, charHeight);
  for (let i = 0; i < charHeight; i++) {
    assertEquals(result[i], [...alphabet["A"][i], 0]);
  }
});

Deno.test("preRender test with multiple characters", () => {
  const rows = initializeRows();
  const result = preRender("AB", rows);
  assertEquals(result.length, charHeight);
  for (let i = 0; i < charHeight; i++) {
    assertEquals(result[i], [...alphabet["A"][i], 0, ...alphabet["B"][i], 0]);
  }
});

Deno.test("renderString test", () => {
  const mockConsoleLog = console.log;
  const logs: string[] = [];
  console.log = (message: string) => logs.push(message);

  renderString("HI");
  assertEquals(logs.length, charHeight);
  for (let i = 0; i < charHeight; i++) {
    const expectedH = alphabet["H"][i].map((pixel) => pixel === 1 ? "█" : " ")
      .join("");
    const expectedI = alphabet["I"][i].map((pixel) => pixel === 1 ? "█" : " ")
      .join("");
    assertEquals(logs[i], expectedH + " " + expectedI + " ");
  }

  console.log = mockConsoleLog;
});
