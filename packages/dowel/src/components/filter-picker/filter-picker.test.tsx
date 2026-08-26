import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterPicker } from "./index";

describe("FilterPicker", () => {
  it("searches properties and adds a selected value", async () => {
    const onAddFilter = vi.fn();
    render(
      <FilterPicker
        properties={[
          {
            id: "status",
            label: "Status",
            values: [
              { value: "active", label: "Active" },
              { value: "done", label: "Completed" },
            ],
          },
          {
            id: "team",
            label: "Team",
            values: [{ value: "platform", label: "Platform" }],
          },
        ]}
        onAddFilter={onAddFilter}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Filter" }));
    await userEvent.type(
      await screen.findByRole("searchbox", {
        name: "Search filter properties",
      }),
      "status",
    );
    await userEvent.hover(screen.getByRole("button", { name: "Status" }));
    expect(
      screen.getByRole("searchbox", { name: "Search filter properties" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("searchbox", { name: "Search Status" }),
    ).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(onAddFilter).toHaveBeenCalledWith("status", "done");
  });
});
