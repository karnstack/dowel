import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Collapsible } from "./index";
describe("Collapsible", () => {
  it("toggles its panel", async () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>More</Collapsible.Trigger>
        <Collapsible.Panel>
          <Collapsible.Content>Hidden details</Collapsible.Content>
        </Collapsible.Panel>
      </Collapsible.Root>,
    );
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByText("Hidden details")).toBeDefined();
  });
});
