import { createContext, useContext } from "react";

export type DocsTheme = "light" | "dark" | null;

type DocsContextValue = {
  navOpen: boolean;
  openSearch: () => void;
  setNavOpen: (open: boolean) => void;
  theme: DocsTheme;
  toggleTheme: () => void;
};

export const DocsContext = createContext<DocsContextValue | null>(null);

export function useDocs() {
  const context = useContext(DocsContext);
  if (!context) throw new Error("useDocs must be used inside the docs root");
  return context;
}
