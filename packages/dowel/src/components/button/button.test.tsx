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

  it("carries the dowel-btn class", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button").className).toContain("dowel-btn");
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

  it("renders as another element via the render prop", () => {
    render(<Button render={<a href="/docs" />}>Docs</Button>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("dowel-btn");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Button>Go</Button>);
    expect(light.querySelector(".dowel-btn")).not.toBeNull();
    expect(dark.querySelector(".dowel-btn")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Go</Button>);
    await expectNoA11yViolations(container);
  });
});
