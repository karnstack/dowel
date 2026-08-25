import * as stylex from "@stylexjs/stylex";
import { createContext, forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { tokens } from "./tokens.stylex";
import { darkTheme, lightTheme, systemTheme } from "./themes.stylex";

export type DowelTheme = "light" | "dark" | "system";

export const DowelThemeContext = createContext<DowelTheme>("system");

export interface ThemeProviderProps
  extends Omit<ComponentPropsWithoutRef<"div">, "className" | "style"> {
  theme?: DowelTheme;
}

const styles = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-canvas"],
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 450,
    letterSpacing: "-0.0125rem",
    minHeight: "100dvh",
    minWidth: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  light: { colorScheme: "light" },
  dark: { colorScheme: "dark" },
  system: {
    colorScheme: {
      default: "light",
      "@media (prefers-color-scheme: dark)": "dark",
    },
  },
});

export const themeStyles = {
  light: lightTheme,
  dark: darkTheme,
  system: systemTheme,
} as const;

export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  function ThemeProvider({ theme = "system", ...props }, ref) {
    const resolved = stylex.props(
      themeStyles[theme],
      styles.root,
      styles[theme],
    );

    return (
      <DowelThemeContext.Provider value={theme}>
        <div
          ref={ref}
          {...props}
          className={resolved.className}
          style={resolved.style}
          data-dowel-theme={theme}
        />
      </DowelThemeContext.Provider>
    );
  },
);
