import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContextMenu } from "./index";
describe("ContextMenu", () => {
  it("opens at the pointer", async () => {
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner>
            <ContextMenu.Popup>
              <ContextMenu.Item>Rename</ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>,
    );
    fireEvent.contextMenu(screen.getByText("Right click"));
    expect(await screen.findByText("Rename")).toBeDefined();
  });
});
