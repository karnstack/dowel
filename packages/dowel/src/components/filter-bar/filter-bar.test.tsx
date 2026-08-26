import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { FilterBar } from "./index";

describe("FilterBar", () => {
  it("edits, removes, and clears filters", async () => {
    const onFilterClick = vi.fn();
    const onRemove = vi.fn();
    const onClear = vi.fn();
    const { container } = render(
      <FilterBar
        filters={[
          { id: "status", label: "Status", value: "Started" },
          { id: "team", label: "Team", value: "Platform" },
        ]}
        onFilterClick={onFilterClick}
        onRemove={onRemove}
        onClear={onClear}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /StatusStarted/i }),
    );
    expect(onFilterClick).toHaveBeenCalledWith("status");
    await userEvent.click(
      screen.getByRole("button", { name: "Remove Status filter" }),
    );
    expect(onRemove).toHaveBeenCalledWith("status");
    await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onClear).toHaveBeenCalled();
    await expectNoA11yViolations(container);
  });
});
