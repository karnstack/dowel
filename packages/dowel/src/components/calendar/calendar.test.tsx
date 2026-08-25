import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { parseDate } from "@internationalized/date";
import { describe, expect, it, vi } from "vitest";
import { Calendar, DatePicker } from "./index";
describe("Calendar", () => {
  it("marks the controlled date as selected", () => {
    render(<Calendar value={parseDate("2026-08-12")} locale="en-US" />);
    expect(
      screen
        .getByRole("button", { name: /August 12, 2026/i })
        .getAttribute("data-selected"),
    ).not.toBeNull();
  });

  it("selects a date", async () => {
    const change = vi.fn();
    render(
      <Calendar
        defaultFocusedValue={parseDate("2026-08-01")}
        onValueChange={change}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /August 12, 2026/i }),
    );
    expect(change.mock.calls[0]?.[0]?.toString()).toBe("2026-08-12");
  });
  it("opens from a date picker", async () => {
    render(
      <DatePicker
        label="Due date"
        placeholderValue={parseDate("2026-08-01")}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Open calendar.*Due date/i }),
    );
    expect(
      await screen.findByRole("grid", { name: /August 2026/i }),
    ).toBeDefined();
  });
  it("moves focus with calendar arrow keys", async () => {
    render(<Calendar defaultValue={parseDate("2026-08-12")} locale="en-US" />);
    const selected = screen.getByRole("button", {
      name: /August 12, 2026/i,
    });
    selected.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: /August 13, 2026/i }),
    );
  });
});
