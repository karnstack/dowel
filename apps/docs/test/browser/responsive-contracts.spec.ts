import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Browser, BrowserContext, Page } from "@playwright/test";

const baseURL = "http://127.0.0.1:4175";

const viewports = [
  { name: "phone", width: 390, height: 844, compact: true },
  { name: "tablet", width: 768, height: 1024, compact: true },
  { name: "small desktop", width: 1024, height: 768, compact: false },
  { name: "desktop", width: 1440, height: 1000, compact: false },
] as const;

async function createPage(
  browser: Browser,
  viewport: { width: number; height: number },
  hasTouch = false,
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({ baseURL, hasTouch, viewport });
  return { context, page: await context.newPage() };
}

test("documentation shell follows the compact breakpoint matrix", async ({
  browser,
}) => {
  for (const viewport of viewports) {
    const { context, page } = await createPage(browser, viewport);
    await page.goto("/components");

    const desktopNav = page.locator('[aria-label="Documentation navigation"]');
    const mobileTrigger = page.getByRole("button", {
      name: "Open navigation",
    });

    if (viewport.compact) {
      await expect(desktopNav, viewport.name).toBeHidden();
      await expect(mobileTrigger, viewport.name).toBeVisible();
    } else {
      await expect(desktopNav, viewport.name).toBeVisible();
      await expect(mobileTrigger, viewport.name).toBeHidden();
    }

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(overflow.scrollWidth, viewport.name).toBeLessThanOrEqual(
      overflow.clientWidth,
    );

    await context.close();
  }
});

test("dense controls keep their desktop geometry", async ({ browser }) => {
  const { context, page } = await createPage(browser, {
    width: 1440,
    height: 1000,
  });

  await page.goto("/components/command-menu");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open commands" }).click();
  const commandMenu = page.locator('[data-dowel-component="command-menu"]');
  await expect(commandMenu).toBeVisible();
  await expect(commandMenu.getByRole("combobox")).toHaveCSS("height", "40px");
  await expect(
    commandMenu.getByRole("option", { name: /Open repository/ }),
  ).toHaveCSS("height", "40px");
  await expect(
    commandMenu.getByRole("option", { name: /Open settings/ }),
  ).toHaveCSS("height", "32px");
  await page.keyboard.press("Escape");

  await page.goto("/components/select");
  await page.waitForLoadState("networkidle");
  await page.getByRole("combobox", { name: "Git provider" }).click();
  await expect(page.getByRole("option", { name: "GitHub" })).toHaveCSS(
    "height",
    "32px",
  );
  await expect(page.getByRole("option", { name: /Self-hosted Git/ })).toHaveCSS(
    "height",
    "44px",
  );

  await context.close();
});

test("touch controls preserve readable rows and 48px hit targets", async ({
  browser,
}) => {
  const { context, page } = await createPage(browser, {
    width: 390,
    height: 844,
  });

  await page.goto("/components/command-menu");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open commands" }).click();
  const commandMenu = page.locator('[data-dowel-component="command-menu"]');
  await expect(commandMenu.getByRole("combobox")).toHaveCSS("height", "48px");
  await expect(
    commandMenu.getByRole("option", { name: /Open settings/ }),
  ).toHaveCSS("height", "44px");
  await expect(
    commandMenu.getByRole("option", { name: /Open repository/ }),
  ).toHaveCSS("height", "52px");
  await page.keyboard.press("Escape");

  await page.goto("/components/select");
  await page.waitForLoadState("networkidle");
  await page.getByRole("combobox", { name: "Git provider" }).click();
  await expect(page.getByRole("option", { name: "GitHub" })).toHaveCSS(
    "height",
    "44px",
  );
  await expect(page.getByRole("option", { name: /Self-hosted Git/ })).toHaveCSS(
    "height",
    "56px",
  );

  await context.close();

  const { context: coarseContext, page: coarsePage } = await createPage(
    browser,
    { width: 390, height: 844 },
    true,
  );

  await coarsePage.goto("/components/checkbox");
  await coarsePage.waitForLoadState("networkidle");
  const checkbox = coarsePage
    .locator('[data-dowel-component="checkbox"]')
    .first();
  await expect(checkbox).toHaveCSS("height", "20px");
  expect(
    await checkbox.evaluate((element) =>
      Math.round(
        Number.parseFloat(getComputedStyle(element, "::before").height),
      ),
    ),
  ).toBe(48);

  await coarsePage.goto("/components/switch");
  await coarsePage.waitForLoadState("networkidle");
  const switchControl = coarsePage
    .locator('[data-dowel-component="switch"]')
    .first();
  await expect(switchControl).toHaveCSS("height", "20px");
  await expect(switchControl).toHaveCSS("width", "44px");
  expect(
    await switchControl.evaluate((element) =>
      Math.round(
        Number.parseFloat(getComputedStyle(element, "::before").height),
      ),
    ),
  ).toBe(48);

  await coarseContext.close();
});

for (const viewport of viewports.filter(({ compact }) => compact)) {
  test(`component catalog meets contrast requirements at ${viewport.name}`, async ({
    browser,
  }) => {
    const { context, page } = await createPage(browser, viewport);
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
    await context.close();
  });
}
