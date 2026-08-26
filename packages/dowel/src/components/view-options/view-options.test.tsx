import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ViewOptions } from "./index";

describe("ViewOptions", () => {
  it("changes density and column visibility", async () => {
    const onGroupingChange = vi.fn();
    const onDensityChange = vi.fn();
    const onColumnVisibilityChange = vi.fn();
    render(
      <ViewOptions
        grouping={{
          value: "status",
          options: [
            { value: "status", label: "Status" },
            { value: "team", label: "Team" },
          ],
          onValueChange: onGroupingChange,
        }}
        density="compact"
        onDensityChange={onDensityChange}
        columns={[{ id: "team", label: "Team", visible: true }]}
        onColumnVisibilityChange={onColumnVisibilityChange}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Display options" }),
    );
    await userEvent.click(
      await screen.findByRole("button", { name: "Grouping" }),
    );
    await userEvent.click(await screen.findByRole("option", { name: "Team" }));
    expect(onGroupingChange).toHaveBeenCalledWith("team");

    await userEvent.click(
      await screen.findByRole("button", { name: "Density" }),
    );
    await userEvent.click(
      await screen.findByRole("option", { name: "Comfortable" }),
    );
    expect(onDensityChange).toHaveBeenCalledWith("comfortable");

    expect(screen.getByRole("dialog", { name: "View options" })).toBeTruthy();

    await userEvent.click(await screen.findByRole("button", { name: "Team" }));
    expect(onColumnVisibilityChange).toHaveBeenCalledWith("team", false);
  });
});
