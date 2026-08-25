import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { ThemeProvider } from "../../theme/theme-provider";
import { Button } from "../button";
import { Popover } from "./index";

function Example() {
  return (
    <Popover.Root>
      <Popover.Trigger render={<Button>Repository access</Button>} />
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Repository access</Popover.Title>
            <Popover.Description>
              Visible to organization members.
            </Popover.Description>
            <Popover.Close render={<Button size="sm">Done</Button>} />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

describe("Popover", () => {
  it("opens from its trigger and closes from its close control", async () => {
    render(<Example />);
    expect(screen.queryByText("Visible to organization members.")).toBeNull();

    await userEvent.click(
      screen.getByRole("button", { name: "Repository access" }),
    );
    expect(
      await screen.findByText("Visible to organization members."),
    ).toBeDefined();

    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() =>
      expect(screen.queryByText("Visible to organization members.")).toBeNull(),
    );
  });

  it("carries the active theme into its portal", async () => {
    render(
      <ThemeProvider theme="dark">
        <Popover.Root defaultOpen>
          <Popover.Portal data-testid="portal">
            <Popover.Positioner>
              <Popover.Popup>Details</Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </ThemeProvider>,
    );
    await screen.findByText("Details");
    expect(screen.getByTestId("portal").dataset.dowelTheme).toBe("dark");
  });

  it("ignores appearance props smuggled onto rendered parts", async () => {
    const smuggled = {
      id: "smuggled-popup",
      className: "evil",
      style: { color: "red" },
    };
    render(
      <Popover.Root defaultOpen>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup {...smuggled}>Details</Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>,
    );
    await screen.findByText("Details");
    const popup = document.getElementById("smuggled-popup")!;
    expect(popup.className).not.toContain("evil");
    expect(popup.style.color).toBe("");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await userEvent.click(
      screen.getByRole("button", { name: "Repository access" }),
    );
    await screen.findByText("Visible to organization members.");
    await expectNoA11yViolations(container);
  });
});
