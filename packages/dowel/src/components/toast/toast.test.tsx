import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { ToastProvider, toast } from "./index";

afterEach(() => toast.dismiss());

describe("Toast", () => {
  it("creates and dismisses a global toast", async () => {
    render(
      <ToastProvider timeout={0}>
        <button
          type="button"
          onClick={() =>
            toast.success("Repository created", {
              description: "dowel is ready",
            })
          }
        >
          Create
        </button>
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(await screen.findByText("Repository created")).toBeDefined();
    await userEvent.hover(
      screen
        .getByText("Repository created")
        .closest('[data-dowel-component="toast"]')!,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    await waitFor(() =>
      expect(screen.queryByText("Repository created")).toBeNull(),
    );
  });

  it("runs toast actions", async () => {
    const undo = vi.fn();
    render(
      <ToastProvider timeout={0}>
        <button
          type="button"
          onClick={() =>
            toast("Archived", {
              actionProps: { children: "Undo", onClick: undo },
            })
          }
        >
          Archive
        </button>
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Archive" }));
    await userEvent.click(await screen.findByRole("button", { name: "Undo" }));
    expect(undo).toHaveBeenCalledOnce();
  });

  it("stacks toasts and expands them on hover", async () => {
    render(
      <ToastProvider timeout={0}>
        <button
          type="button"
          onClick={() => {
            toast("First");
            toast("Second");
            toast("Third");
          }}
        >
          Create stack
        </button>
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Create stack" }));
    await screen.findByText("Third");

    const viewport = document.querySelector(
      '[data-dowel-component="toast-viewport"]',
    )!;
    const roots = [
      ...document.querySelectorAll<HTMLElement>(
        '[data-dowel-component="toast"]',
      ),
    ];
    expect(roots).toHaveLength(3);
    expect(
      roots.map((root) => root.style.getPropertyValue("--toast-index")).sort(),
    ).toEqual(["0", "1", "2"]);
    expect(document.querySelectorAll("[data-behind]")).toHaveLength(2);

    await userEvent.hover(viewport);
    await waitFor(() => {
      expect(viewport.hasAttribute("data-expanded")).toBe(true);
      expect(roots.every((root) => root.hasAttribute("data-expanded"))).toBe(
        true,
      );
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToastProvider timeout={0}>
        <button type="button" onClick={() => toast.info("Synced")}>
          Sync
        </button>
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Sync" }));
    await screen.findByText("Synced");
    await expectNoA11yViolations(container.ownerDocument.body);
  });
});
