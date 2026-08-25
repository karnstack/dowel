import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("announces the loading label", () => {
    render(<Spinner label="Loading repositories" />);
    expect(screen.getByRole("status").textContent).toBe("Loading repositories");
  });

  it("exposes its size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status").dataset.size).toBe("lg");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = {
      id: "spinner",
      className: "evil",
      style: { color: "red" },
    };
    render(<Spinner {...smuggled} />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).not.toContain("evil");
    expect(spinner.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    await expectNoA11yViolations(container);
  });
});
