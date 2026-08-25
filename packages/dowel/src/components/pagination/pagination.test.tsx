import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./index";
describe("Pagination", () => {
  it("moves to another page", async () => {
    const change = vi.fn();
    render(<Pagination page={2} totalPages={8} onPageChange={change} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(change).toHaveBeenCalledWith(3);
  });
});
