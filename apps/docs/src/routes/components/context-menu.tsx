import { createFileRoute } from "@tanstack/react-router";
import { ContextMenu } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/context-menu")({
  component: ContextMenuDocs,
});

function ContextMenuDocs() {
  return (
    <DocsPage
      title="Context Menu"
      lead="A pointer-positioned action menu that shares Dowel's dropdown interaction model."
      toc={[{ id: "default", title: "Context actions" }]}
    >
      <Section id="default" title="Context actions">
        <Demo
          layout="stack"
          code={`<ContextMenu.Root>\n  <ContextMenu.Trigger>Right-click this surface</ContextMenu.Trigger>\n  <ContextMenu.Portal>\n    <ContextMenu.Positioner>\n      <ContextMenu.Popup>\n        <ContextMenu.Item>Rename</ContextMenu.Item>\n        <ContextMenu.Item>Duplicate</ContextMenu.Item>\n      </ContextMenu.Popup>\n    </ContextMenu.Positioner>\n  </ContextMenu.Portal>\n</ContextMenu.Root>`}
        >
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              Right-click this surface for project actions
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
              <ContextMenu.Positioner>
                <ContextMenu.Popup>
                  <ContextMenu.Item>Rename</ContextMenu.Item>
                  <ContextMenu.Item>Duplicate</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item tone="danger">Archive</ContextMenu.Item>
                </ContextMenu.Popup>
              </ContextMenu.Positioner>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
