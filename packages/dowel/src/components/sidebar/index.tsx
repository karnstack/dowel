import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";

import * as styles from "./sidebar.stylex";

type DivProps = ComponentPropsWithoutRef<"div">;
type AsideProps = ComponentPropsWithoutRef<"aside">;

type SidebarContextValue = {
  defaultWidth: number;
  maxWidth: number;
  minWidth: number;
  resizing: boolean;
  setResizing: (resizing: boolean) => void;
  setWidth: (width: number) => void;
  sticky: boolean;
  variant: SidebarVariant;
  width: number;
};

export type SidebarVariant = "inset" | "split";

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar parts must be rendered inside Sidebar.Root");
  }
  return context;
}

function mergeClassName(internal?: string, external?: string) {
  return [internal, external].filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function cssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

type SidebarVariables = CSSProperties & {
  "--dowel-sidebar-offset": string;
  "--dowel-sidebar-width": string;
};

export interface SidebarRootProps extends DivProps {
  /** `inset` places content on Linear-style rounded workspace surface. */
  variant?: SidebarVariant;
  /** Initial width in pixels when the sidebar is uncontrolled. */
  defaultWidth?: number;
  /** Controlled width in pixels. */
  width?: number;
  /** Smallest width reachable by pointer or keyboard resizing. */
  minWidth?: number;
  /** Largest width reachable by pointer or keyboard resizing. */
  maxWidth?: number;
  /** Keeps the panel below sticky application chrome when provided. */
  stickyOffset?: number | string;
  /** Called whenever interaction requests a new width. */
  onWidthChange?: (width: number) => void;
}

const Root = forwardRef<HTMLDivElement, SidebarRootProps>(function SidebarRoot(
  {
    defaultWidth = 232,
    width: controlledWidth,
    minWidth = 192,
    maxWidth = 320,
    stickyOffset,
    variant = "inset",
    onWidthChange,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const lower = Math.min(minWidth, maxWidth);
  const upper = Math.max(minWidth, maxWidth);
  const initial = clamp(defaultWidth, lower, upper);
  const [uncontrolledWidth, setUncontrolledWidth] = useState(initial);
  const [resizing, setResizing] = useState(false);
  const width = clamp(controlledWidth ?? uncontrolledWidth, lower, upper);

  const setWidth = useCallback(
    (nextWidth: number) => {
      const next = clamp(nextWidth, lower, upper);
      if (controlledWidth === undefined) setUncontrolledWidth(next);
      onWidthChange?.(next);
    },
    [controlledWidth, lower, onWidthChange, upper],
  );

  const context = useMemo<SidebarContextValue>(
    () => ({
      defaultWidth: initial,
      maxWidth: upper,
      minWidth: lower,
      resizing,
      setResizing,
      setWidth,
      sticky: stickyOffset !== undefined,
      variant,
      width,
    }),
    [initial, lower, resizing, setWidth, stickyOffset, upper, variant, width],
  );
  const resolved = stylex.props(
    styles.parts.root,
    variant === "split" && styles.parts.splitRoot,
  );
  const variables: SidebarVariables = {
    ...resolved.style,
    ...style,
    "--dowel-sidebar-offset": cssLength(stickyOffset ?? 0),
    "--dowel-sidebar-width": `${width}px`,
  };

  return (
    <SidebarContext.Provider value={context}>
      <div
        ref={ref}
        {...props}
        className={mergeClassName(resolved.className, className)}
        style={variables}
        data-dowel-component="sidebar"
        data-resizing={resizing ? "" : undefined}
        data-variant={variant}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
});

const Panel = forwardRef<HTMLElement, AsideProps>(function SidebarPanel(
  { className, style, ...props },
  ref,
) {
  const { sticky } = useSidebar();
  const resolved = stylex.props(
    styles.parts.panel,
    sticky && styles.parts.stickyPanel,
  );

  return (
    <aside
      ref={ref}
      {...props}
      className={mergeClassName(resolved.className, className)}
      style={{ ...resolved.style, ...style }}
      data-dowel-part="sidebar-panel"
    />
  );
});

function createPart(name: "header" | "body" | "footer") {
  return forwardRef<HTMLDivElement, DivProps>(function SidebarPart(
    { className, style, ...props },
    ref,
  ) {
    const resolved = stylex.props(styles.parts[name]);
    return (
      <div
        ref={ref}
        {...props}
        className={mergeClassName(resolved.className, className)}
        style={{ ...resolved.style, ...style }}
        data-dowel-part={`sidebar-${name}`}
      />
    );
  });
}

const Header = createPart("header");
const Body = createPart("body");
const Footer = createPart("footer");

const Content = forwardRef<HTMLDivElement, DivProps>(function SidebarContent(
  { className, style, ...props },
  ref,
) {
  const { variant } = useSidebar();
  const resolved = stylex.props(
    styles.parts.content,
    variant === "split" && styles.parts.splitContent,
  );

  return (
    <div
      ref={ref}
      {...props}
      className={mergeClassName(resolved.className, className)}
      style={{ ...resolved.style, ...style }}
      data-dowel-part="sidebar-content"
    />
  );
});

export interface SidebarResizeHandleProps
  extends Omit<DivProps, "role" | "tabIndex"> {
  /** Pixel change used by each arrow-key press. */
  step?: number;
}

const ResizeHandle = forwardRef<HTMLDivElement, SidebarResizeHandleProps>(
  function SidebarResizeHandle(
    {
      "aria-label": ariaLabel = "Resize sidebar",
      step = 8,
      onDoubleClick,
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const {
      defaultWidth,
      maxWidth,
      minWidth,
      resizing,
      setResizing,
      setWidth,
      width,
      variant,
    } = useSidebar();
    const drag = useRef<{ startX: number; startWidth: number } | null>(null);
    const resolved = stylex.props(
      styles.parts.handle,
      variant === "split" && styles.parts.splitHandle,
    );

    const endResize = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        drag.current = null;
        setResizing(false);
        if (
          typeof event.currentTarget.hasPointerCapture === "function" &&
          event.currentTarget.hasPointerCapture(event.pointerId)
        ) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      },
      [setResizing],
    );

    return (
      <div
        ref={ref}
        {...props}
        className={mergeClassName(resolved.className, className)}
        style={{ ...resolved.style, ...style }}
        role="separator"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-orientation="vertical"
        aria-valuemax={maxWidth}
        aria-valuemin={minWidth}
        aria-valuenow={width}
        data-dowel-part="sidebar-resize-handle"
        data-resizing={resizing ? "" : undefined}
        onDoubleClick={(event) => {
          onDoubleClick?.(event);
          if (!event.defaultPrevented) setWidth(defaultWidth);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const distance = event.shiftKey ? step * 3 : step;
          if (event.key === "ArrowLeft") setWidth(width - distance);
          else if (event.key === "ArrowRight") setWidth(width + distance);
          else if (event.key === "Home") setWidth(minWidth);
          else if (event.key === "End") setWidth(maxWidth);
          else return;
          event.preventDefault();
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || event.button !== 0) return;
          drag.current = { startX: event.clientX, startWidth: width };
          setResizing(true);
          if (typeof event.currentTarget.setPointerCapture === "function") {
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (event.defaultPrevented || !drag.current) return;
          setWidth(
            drag.current.startWidth + event.clientX - drag.current.startX,
          );
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          if (!event.defaultPrevented) endResize(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          if (!event.defaultPrevented) endResize(event);
        }}
      />
    );
  },
);

export const Sidebar = {
  Root,
  Panel,
  Header,
  Body,
  Footer,
  ResizeHandle,
  Content,
};
