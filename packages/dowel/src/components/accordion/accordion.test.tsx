import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion } from "./index";

describe("Accordion", () => {
  it("opens panels from their heading", async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="one">
          <Accordion.Header>
            <Accordion.Trigger>Details</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <Accordion.Content>Panel content</Accordion.Content>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByText("Panel content")).toBeDefined();
  });
});
