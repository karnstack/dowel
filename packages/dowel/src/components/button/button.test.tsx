import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Button } from "./index";

describe("Button", () => {
  it("renders its label in a real button element", () => {
    render(<Button>Ship it</Button>);
    expect(screen.getByRole("button", { name: "Ship it" })).toBeDefined();
  });

  it("defaults to the secondary variant at md size", () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole("button");
    expect(btn.dataset.variant).toBe("secondary");
    expect(btn.dataset.size).toBe("md");
  });

  it("exposes the variant and size as data attributes", () => {
    render(
      <Button variant="danger" size="sm">
        Delete
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn.dataset.variant).toBe("danger");
    expect(btn.dataset.size).toBe("sm");
  });

  it("carries compiled StyleX styles", () => {
    render(<Button>Go</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toBeTruthy();
    expect(button.dataset.dowelComponent).toBe("button");
  });

  it("ignores className and style smuggled through a spread", () => {
    // ButtonProps Omits className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Button {...smuggled}>Go</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toBeTruthy();
    expect(btn.className).not.toContain("evil");
    expect(btn.getAttribute("style")).toBeNull();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as another element via render plus nativeButton={false}", () => {
    // Base UI swaps native <button> semantics for role="button" here, so the
    // anchor is queried by that role, not "link".
    render(
      <Button render={<a href="/docs" />} nativeButton={false}>
        Docs
      </Button>,
    );
    const el = screen.getByRole("button", { name: "Docs" });
    expect(el.tagName).toBe("A");
    expect(el.getAttribute("href")).toBe("/docs");
    expect(el.dataset.dowelComponent).toBe("button");
    // `type` is a MIME hint on anchors — it must not leak from button mode.
    expect(el.hasAttribute("type")).toBe(false);
  });

  it("renders a native <button> when nativeButton is unset", () => {
    render(<Button>Go</Button>);
    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Button>Go</Button>);
    expect(
      light.querySelector('[data-dowel-component="button"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="button"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Go</Button>);
    await expectNoA11yViolations(container);
  });
});
