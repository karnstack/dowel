import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TreeView } from "./index";
describe("TreeView", () => {
  it("expands branches and selects nodes", async () => {
    render(
      <TreeView
        items={[
          {
            id: "docs",
            label: "Docs",
            children: [{ id: "api", label: "API" }],
          },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("treeitem", { name: "Docs" }));
    expect(screen.getByRole("treeitem", { name: "API" })).toBeDefined();
    expect(
      screen
        .getByRole("treeitem", { name: "Docs" })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
});
