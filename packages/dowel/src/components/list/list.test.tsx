import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { GroupHeader, List, ListCell, ListRow } from "./index";

describe("List", () => {
  it("renders semantic grouped rows and selection state", () => {
    render(
      <List aria-label="Repositories" divided>
        <GroupHeader>Favorites</GroupHeader>
        <ListRow selected>
          <ListCell grow truncate>
            dowel
          </ListCell>
          <ListCell tone="tertiary">Public</ListCell>
        </ListRow>
      </List>,
    );
    expect(screen.getByRole("list", { name: "Repositories" })).toBeDefined();
    expect(screen.getByText("dowel").closest("li")?.dataset.selected).toBe(
      "true",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <List aria-label="Repositories">
        <ListRow>
          <ListCell>dowel</ListCell>
        </ListRow>
      </List>,
    );
    await expectNoA11yViolations(container);
  });
});
