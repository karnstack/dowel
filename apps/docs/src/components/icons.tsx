import {
  ArrowRightIcon as HeroArrowRightIcon,
  Bars3Icon,
  CheckIcon as HeroCheckIcon,
  ChevronRightIcon as HeroChevronRightIcon,
  MagnifyingGlassIcon,
  MoonIcon as HeroMoonIcon,
  Square2StackIcon,
  SunIcon as HeroSunIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import type { ComponentType, SVGProps } from "react";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

/** Keep every general UI glyph on Heroicons' native 16px Micro grid. */
function docsIcon(Icon: HeroIcon) {
  return function DocsIcon() {
    return (
      <Icon className="docs-icon" aria-hidden="true" width={16} height={16} />
    );
  };
}

export const SunIcon = docsIcon(HeroSunIcon);
export const MoonIcon = docsIcon(HeroMoonIcon);
export const MenuIcon = docsIcon(Bars3Icon);
export const CloseIcon = docsIcon(XMarkIcon);
export const SearchIcon = docsIcon(MagnifyingGlassIcon);
export const CopyIcon = docsIcon(Square2StackIcon);
export const CheckIcon = docsIcon(HeroCheckIcon);
export const ChevronRightIcon = docsIcon(HeroChevronRightIcon);
export const ArrowRightIcon = docsIcon(HeroArrowRightIcon);

/** Heroicons excludes brand logos, so the GitHub mark remains local. */
export const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    className="docs-icon"
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
