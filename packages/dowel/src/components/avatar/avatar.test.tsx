import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("derives a two-letter fallback from the name", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeDefined();
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeDefined();
  });

  it("falls back when the image fails", () => {
    const { container } = render(
      <Avatar name="Grace Hopper" src="/missing.webp" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(screen.getByText("GH")).toBeDefined();
  });

  it("includes presence in its accessible name", () => {
    render(<Avatar name="Lin Chen" status="online" />);
    expect(screen.getByRole("img", { name: "Lin Chen, online" })).toBeDefined();
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Avatar name="Ada Lovelace" {...smuggled} />);
    const avatar = screen.getByRole("img");
    expect(avatar.className).not.toContain("evil");
    expect(avatar.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Avatar name="Ada Lovelace" />);
    expect(
      light.querySelector('[data-dowel-component="avatar"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="avatar"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Avatar name="Ada Lovelace" status="online" />,
    );
    await expectNoA11yViolations(container);
  });
});
