import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Switch } from "../switch";
import { SettingsRow, SettingsSection } from "./index";

function Example() {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose which updates reach your inbox."
    >
      <SettingsRow
        title="Issue activity"
        description="Comments, assignments, and status changes."
      >
        <Switch aria-label="Issue activity" defaultChecked />
      </SettingsRow>
      <SettingsRow title="Product news">
        <Switch aria-label="Product news" />
      </SettingsRow>
    </SettingsSection>
  );
}

describe("SettingsSection and SettingsRow", () => {
  it("labels the section and composes controls into divided rows", () => {
    render(<Example />);
    const section = screen.getByRole("region", { name: "Notifications" });
    expect(section).toBeDefined();
    expect(
      screen.getByRole("switch", { name: "Issue activity" }),
    ).toBeDefined();
    expect(
      section.querySelectorAll('[data-dowel-component="settings-row"]'),
    ).toHaveLength(2);
  });

  it("supports a nested heading level", () => {
    render(
      <SettingsSection headingLevel={3} title="Members">
        <SettingsRow title="Guest access">
          <Switch aria-label="Guest access" />
        </SettingsRow>
      </SettingsSection>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Members" }),
    ).toBeDefined();
  });

  it("does not expose appearance overrides", () => {
    const smuggled = { className: "override", style: { color: "red" } };
    render(
      <SettingsSection title="Settings" {...smuggled}>
        <SettingsRow title="Updates" {...smuggled}>
          <Switch aria-label="Updates" />
        </SettingsRow>
      </SettingsSection>,
    );
    for (const element of document.querySelectorAll("[data-dowel-component]")) {
      expect(element.className).not.toContain("override");
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
