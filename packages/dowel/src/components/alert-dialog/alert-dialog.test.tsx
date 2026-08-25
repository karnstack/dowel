import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { ThemeProvider } from "../../theme/theme-provider";
import { Button } from "../button";
import { AlertDialog } from "./index";

function Example({ onConfirm = vi.fn() }: { onConfirm?: () => void }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button>Delete repository</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete repository?</AlertDialog.Title>
            <AlertDialog.Description>
              This permanently removes the repository and its settings.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Close render={<Button>Cancel</Button>} />
            <AlertDialog.Close
              render={<Button variant="danger">Delete repository</Button>}
              onClick={onConfirm}
            />
          </AlertDialog.Footer>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

describe("AlertDialog", () => {
  it("exposes alertdialog semantics and returns focus after cancel", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Delete repository" });
    await userEvent.click(trigger);
    expect(screen.getByRole("alertdialog")).toBeDefined();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("runs the confirmed action", async () => {
    const onConfirm = vi.fn();
    render(<Example onConfirm={onConfirm} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Delete repository" }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Delete repository" }),
    );
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("carries the active theme into its portal", async () => {
    render(
      <ThemeProvider theme="dark">
        <Example />
      </ThemeProvider>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Delete repository" }),
    );
    expect(
      screen.getByRole("alertdialog").closest('[data-dowel-theme="dark"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <main>
        <Example />
      </main>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Delete repository" }),
    );
    await expectNoA11yViolations(container.ownerDocument.body);
  });
});
