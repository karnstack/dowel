import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const themes = ["light", "dark"] as const;

for (const theme of themes) {
  test(`component catalog meets WCAG 2.2 AA contrast in ${theme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/components");
    await expect(page.locator(".docs-gallery")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();
    const summary = results.violations.flatMap((violation) =>
      violation.nodes.map(
        (node) =>
          `${violation.id}: ${node.failureSummary ?? violation.help} at ${node.target.join(" ")}`,
      ),
    );

    expect(summary).toEqual([]);
  });
}
