import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  it.each(["light", "dark", "system"] as const)(
    "applies the %s theme",
    (theme) => {
      render(<ThemeProvider theme={theme}>Content</ThemeProvider>);
      const root = screen.getByText("Content");
      expect(root.dataset.dowelTheme).toBe(theme);
      expect(root.className).toBeTruthy();
    },
  );

  it("defaults to the system theme", () => {
    render(<ThemeProvider>Content</ThemeProvider>);
    expect(screen.getByText("Content").dataset.dowelTheme).toBe("system");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<ThemeProvider {...smuggled}>Content</ThemeProvider>);
    const root = screen.getByText("Content");
    expect(root.className).not.toContain("evil");
    expect(root.getAttribute("style")).toBeNull();
  });
});
