import type { ReactNode } from "react";

import { CodeBlock } from "./code-block";

export type DemoProps = {
  /** The live components. Real dowel, never a mock-up of one. */
  children: ReactNode;
  /** The source that produces exactly what is in the preview. */
  code: string;
  /**
   * `row` centres a wrapping row of controls — right for buttons and badges.
   * `stack` is for things with width, like a field or a menu. `start` is for
   * a single trigger that should not float in the middle of the surface.
   */
  layout?: "row" | "stack" | "start";
};

/**
 * A demo is a preview surface and its source welded together, because the
 * two drifting apart is the failure mode of every component doc. They share
 * one bordered container so the code reads as the caption to the picture
 * rather than as an unrelated block that happens to sit underneath.
 */
export function Demo({ children, code, layout = "row" }: DemoProps) {
  return (
    <div className="docs-demo">
      <div className="docs-demo-preview" data-layout={layout}>
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  );
}
