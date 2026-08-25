import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "./index";
describe("FileUpload", () => {
  it("accepts and removes a file", async () => {
    const change = vi.fn();
    const { container } = render(<FileUpload onFilesChange={change} />);
    const input = container.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    await userEvent.upload(input, file);
    expect(screen.getByText("notes.txt")).toBeDefined();
    await userEvent.click(
      screen.getByRole("button", { name: "Remove notes.txt" }),
    );
    expect(screen.queryByText("notes.txt")).toBeNull();
    expect(change).toHaveBeenLastCalledWith([]);
  });
});
