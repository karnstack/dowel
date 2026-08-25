import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Slider } from "./index";
describe("Slider", () => {
  it("responds to keyboard changes", async () => {
    render(
      <Slider.Root defaultValue={25}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Volume" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(slider.getAttribute("aria-valuenow")).toBe("26");
  });
});
