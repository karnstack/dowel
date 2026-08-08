import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { IconButton } from "./index";

const Icon = () => <svg aria-hidden="true" width="14" height="14" />;

describe("IconButton", () => {
  it("names the button from the required label prop", () => {
    render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeDefined();
  });

  it("is a circle by default at 28px", () => {
    render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("dowel-icon-btn");
    expect(btn.dataset.size).toBe("md");
  });

  it("supports the sm size", () => {
    render(
      <IconButton label="Close" size="sm">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button").dataset.size).toBe("sm");
  });

  it("ignores className and style smuggled through a spread", () => {
    // IconButtonProps Omits className/style, but JSX spreads skip
    // excess-property checks, so a wider object typechecks. The runtime must
    // hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(
      <IconButton label="Close" {...smuggled}>
        <Icon />
      </IconButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("dowel-icon-btn");
    expect(btn.className).not.toContain("evil");
    expect(btn.getAttribute("style")).toBeNull();
  });

  it("keeps the label prop's aria-label over a smuggled one", () => {
    // aria-label is Omitted from the props for the same reason label is
    // required: the accessible name must come from `label`, always.
    const smuggled = { "aria-label": "evil" };
    render(
      <IconButton label="Close" {...smuggled}>
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeDefined();
  });

  it("renders as another element via render plus nativeButton={false}", () => {
    // Base UI swaps native <button> semantics for role="button" here, so the
    // anchor is queried by that role, not "link".
    render(
      <IconButton label="Docs" render={<a href="/docs" />} nativeButton={false}>
        <Icon />
      </IconButton>,
    );
    const el = screen.getByRole("button", { name: "Docs" });
    expect(el.tagName).toBe("A");
    expect(el.getAttribute("href")).toBe("/docs");
    expect(el.className).toContain("dowel-icon-btn");
    // `type` is a MIME hint on anchors — it must not leak from button mode.
    expect(el.hasAttribute("type")).toBe(false);
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    expect(light.querySelector(".dowel-icon-btn")).not.toBeNull();
    expect(dark.querySelector(".dowel-icon-btn")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    await expectNoA11yViolations(container);
  });
});
