import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const themes = ["light", "dark"] as const;

test("dependencies renders inside the documentation shell", async ({
  page,
}) => {
  await page.goto("/dependencies");

  await expect(
    page.locator('[aria-label="Documentation navigation"]'),
  ).toBeVisible();
  await expect(page.locator(".docs-workspace-title")).toHaveText(
    "Dependencies",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Dependencies" }),
  ).toBeVisible();
  await expect(page.locator(".docs-workspace-footer")).toBeVisible();
});

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
