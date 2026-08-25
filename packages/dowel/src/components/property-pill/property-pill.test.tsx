import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { PropertyPill } from "./index";

describe("PropertyPill", () => {
  it("renders a labelled button with an optional decorative icon", () => {
    render(<PropertyPill label="Triage" icon={<span>icon</span>} />);
    const button = screen.getByRole("button", { name: "Triage" });
    expect(button.dataset.dowelComponent).toBe("property-pill");
    expect(button.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(button.getAttribute("type")).toBe("button");
  });

  it("exposes tone and active state", () => {
    render(<PropertyPill label="Urgent" tone="danger" active />);
    const button = screen.getByRole("button");
    expect(button.dataset.tone).toBe("danger");
    expect(button.hasAttribute("data-active")).toBe(true);
  });

  it("fires its action", async () => {
    const onClick = vi.fn();
    render(<PropertyPill label="Assignee" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<PropertyPill label="Project" {...smuggled} />);
    const button = screen.getByRole("button");
    expect(button.className).not.toContain("evil");
    expect(button.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PropertyPill label="Status" />);
    await expectNoA11yViolations(container);
  });
});
