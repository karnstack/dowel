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

test("documentation search uses the library command menu and includes dependencies", async ({
  page,
}) => {
  await page.goto("/components/command-menu");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /^search\b/i }).click();

  const commandMenu = page.locator('[data-dowel-component="command-menu"]');
  await expect(commandMenu).toBeVisible();
  await commandMenu.getByRole("combobox").fill("dependencies");
  await commandMenu.getByText("Dependencies", { exact: true }).click();

  await expect(page).toHaveURL(/\/dependencies$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dependencies" }),
  ).toBeVisible();
});

test("calendar exposes its live selected date and uses a non-text cursor", async ({
  page,
}) => {
  await page.goto("/components/calendar");

  const twelfth = page
    .getByRole("button", { name: /August 12, 2026/i })
    .first();
  await expect(twelfth).toHaveAttribute("data-selected", "true");
  await expect(page.locator(".docs-calendar-value")).toHaveText(
    "Selected: 2026-08-12",
  );
  await expect(twelfth).toHaveCSS("cursor", "default");
  await expect(twelfth).toHaveCSS("align-items", "center");
  await expect(twelfth).toHaveCSS("justify-content", "center");

  await page
    .getByRole("button", { name: /August 20, 2026/i })
    .first()
    .click();
  await expect(page.locator(".docs-calendar-value")).toHaveText(
    "Selected: 2026-08-20",
  );
});

test("semantic badges share one neutral shell", async ({ page }) => {
  await page.goto("/components/badge");

  const accent = page.locator(
    '[data-dowel-component="badge"][data-tone="accent"]',
  );
  const danger = page.locator(
    '[data-dowel-component="badge"][data-tone="danger"]',
  );
  const [accentBackground, dangerBackground, accentColor, dangerColor] =
    await Promise.all([
      accent.evaluate((element) => getComputedStyle(element).backgroundColor),
      danger.evaluate((element) => getComputedStyle(element).backgroundColor),
      accent.evaluate((element) => getComputedStyle(element).color),
      danger.evaluate((element) => getComputedStyle(element).color),
    ]);

  expect(dangerBackground).toBe(accentBackground);
  expect(dangerColor).not.toBe(accentColor);
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
