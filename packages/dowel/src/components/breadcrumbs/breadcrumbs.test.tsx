import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./index";
describe("Breadcrumbs", () => {
  it("marks the current page", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Settings", current: true },
        ]}
      />,
    );
    expect(screen.getByText("Settings").getAttribute("aria-current")).toBe(
      "page",
    );
  });
});
