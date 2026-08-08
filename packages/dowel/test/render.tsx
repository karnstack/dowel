import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Renders `ui` once under each `data-dowel-theme` attribute and returns both
 * wrappers. jsdom applies no author stylesheet (it ignores rules inside
 * `@layer`, where every dowel rule lives, and does not inherit custom
 * properties), so this checks only that the component renders under both
 * theme attributes without throwing. Token resolution is guarded by
 * test/css-contract.test.ts, not here.
 */
export function renderBoth(ui: ReactElement) {
  const light = render(<div data-dowel-theme="light">{ui}</div>);
  const lightEl = light.container.firstElementChild as HTMLElement;

  const dark = render(<div data-dowel-theme="dark">{ui}</div>);
  const darkEl = dark.container.firstElementChild as HTMLElement;

  return { light: lightEl, dark: darkEl };
}
