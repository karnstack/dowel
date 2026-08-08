import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Renders `ui` in both themes. Every component test asserts against both so a
 * token missing from dark.css fails at the component that uses it.
 */
export function renderBoth(ui: ReactElement) {
  const light = render(<div data-dowel-theme="light">{ui}</div>);
  const lightEl = light.container.firstElementChild as HTMLElement;

  const dark = render(<div data-dowel-theme="dark">{ui}</div>);
  const darkEl = dark.container.firstElementChild as HTMLElement;

  return { light: lightEl, dark: darkEl };
}
