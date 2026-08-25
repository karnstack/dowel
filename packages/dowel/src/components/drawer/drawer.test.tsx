import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Drawer } from "./index";

function Example() {
  return (
    <Drawer.Root side="left">
      <Drawer.Trigger render={<Button>Browse</Button>} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup side="left">
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Repositories</Drawer.Title>
                <Drawer.Description>Choose a repository.</Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>Repository list</Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close render={<Button>Close</Button>} />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

describe("Drawer", () => {
  it("opens, exposes its side, and closes", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Browse" }));
    const dialog = screen.getByRole("dialog", { name: "Repositories" });
    expect(dialog.dataset.side).toBe("left");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Browse" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});
