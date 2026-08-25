import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Progress } from "./index";

describe("Progress", () => {
  it("announces and displays determinate progress", () => {
    render(<Progress label="Upload artifacts" value={42} />);
    const progress = screen.getByRole("progressbar", {
      name: "Upload artifacts",
    });
    expect(progress.getAttribute("aria-valuenow")).toBe("42");
    expect(screen.getByText("42%")).toBeDefined();
  });

  it("supports indeterminate progress", () => {
    render(<Progress label="Connecting" value={null} showValue={false} />);
    expect(screen.getByRole("progressbar").hasAttribute("aria-valuenow")).toBe(
      false,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Progress label="Upload artifacts" value={42} />,
    );
    await expectNoA11yViolations(container);
  });
});
