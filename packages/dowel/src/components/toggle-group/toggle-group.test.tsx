import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ToggleGroup } from "./index";
describe("ToggleGroup", () => {
  it("selects one item by default", async () => {
    render(
      <ToggleGroup.Root aria-label="Alignment">
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Right" }));
    expect(
      screen
        .getByRole("button", { name: "Right" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });
});
