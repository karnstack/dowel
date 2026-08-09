import { cleanup } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, expect } from "vitest";

// The vitest config sets `globals: false`, so Testing Library's automatic
// cleanup (which needs a global `afterEach`) never registers. Register it
// here or every `render` leaks into the next test's document.
afterEach(cleanup);

/** Fails the test with a readable list if axe finds any violation. */
export async function expectNoA11yViolations(el: HTMLElement): Promise<void> {
  const results = await axe.run(el, {
    // colour-contrast cannot be computed in jsdom (no layout/paint).
    rules: { "color-contrast": { enabled: false } },
  });
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`,
  );
  expect(summary).toEqual([]);
}
