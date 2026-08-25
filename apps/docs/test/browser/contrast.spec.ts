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

test("component navigation opens the active category and toggles sections", async ({
  page,
}) => {
  await page.goto("/components/toast");
  await expect(
    page.locator('[data-dowel-component="toast-viewport"]'),
  ).toBeAttached();

  const feedback = page.getByRole("button", { name: "Feedback" }).first();
  const actions = page.getByRole("button", { name: "Actions" }).first();
  await expect(feedback).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("link", { name: "Toast", exact: true }).first(),
  ).toBeVisible();
  await expect(actions).toHaveAttribute("aria-expanded", "true");

  await actions.click();
  await expect(actions).toHaveAttribute("aria-expanded", "false");
  await expect(
    actions.locator("xpath=following-sibling::*[1]"),
  ).toHaveAttribute("aria-hidden", "true");
});

test("toast notifications stack and expand on hover", async ({ page }) => {
  await page.goto("/components/toast");
  const viewport = page.locator('[data-dowel-component="toast-viewport"]');
  await expect(viewport).toBeAttached();
  await page.getByRole("button", { name: "Create stack" }).click();

  const toasts = page.locator('[data-dowel-component="toast"]');
  await expect(toasts).toHaveCount(3);
  await toasts.first().hover();
  await expect(viewport).toHaveAttribute("data-expanded", "");
  await expect(toasts.first()).toHaveAttribute("data-expanded", "");
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
