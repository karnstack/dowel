import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { MultiSelectToolbar } from "./index";

describe("MultiSelectToolbar", () => {
  it("renders only with a selection and clears it", async () => {
    const onClear = vi.fn();
    const { container, rerender } = render(
      <MultiSelectToolbar selectedCount={0} onClear={onClear} />,
    );
    expect(screen.queryByRole("toolbar")).toBeNull();

    rerender(
      <MultiSelectToolbar selectedCount={2} itemLabel="issue" onClear={onClear}>
        <button type="button">Archive</button>
      </MultiSelectToolbar>,
    );
    expect(screen.getByText("2 issues selected")).toBeDefined();
    await userEvent.click(
      screen.getByRole("button", { name: "Clear selection" }),
    );
    expect(onClear).toHaveBeenCalled();
    await expectNoA11yViolations(container);
  });
});
