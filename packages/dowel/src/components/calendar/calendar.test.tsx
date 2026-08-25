import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar, DatePicker } from "./index";
describe("Calendar", () => {
  it("selects a date", async () => {
    const change = vi.fn();
    render(
      <Calendar defaultMonth={new Date(2026, 7, 1)} onValueChange={change} />,
    );
    await userEvent.click(
      screen.getByRole("gridcell", { name: /August 12, 2026/i }),
    );
    expect(change).toHaveBeenCalled();
  });
  it("opens from a date picker", async () => {
    render(<DatePicker label="Due date" defaultMonth={new Date(2026, 7, 1)} />);
    await userEvent.click(screen.getByRole("button", { name: "Due date" }));
    expect(
      await screen.findByRole("grid", { name: "August 2026" }),
    ).toBeDefined();
  });
});
