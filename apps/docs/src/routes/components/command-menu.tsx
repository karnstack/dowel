import { createFileRoute } from "@tanstack/react-router";
import { Button, CommandMenu } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/command-menu")({
  component: CommandMenuDocs,
});

const commands = [
  {
    id: "repo",
    label: "Open repository",
    description: "Jump to a repository",
    group: "Navigation",
    shortcut: "G R",
    keywords: ["project"],
    onSelect: () => {},
  },
  {
    id: "settings",
    label: "Open settings",
    group: "Navigation",
    shortcut: "G S",
    onSelect: () => {},
  },
  {
    id: "create",
    label: "Create merge request",
    group: "Actions",
    shortcut: "C M",
    onSelect: () => {},
  },
];

function CommandMenuDocs() {
  return (
    <DocsPage
      title="Command Menu"
      lead="A modal, searchable command surface with groups, descriptions, keywords, and shortcuts."
      toc={[
        { id: "default", title: "Grouped commands" },
        { id: "control", title: "Application control" },
      ]}
    >
      <Section id="default" title="Grouped commands">
        <Demo
          code={`<CommandMenu\n  trigger={<Button>Open commands</Button>}\n  items={commands}\n  footer="↑↓ Navigate · ↵ Run · Esc Close"\n/>`}
        >
          <CommandMenu
            trigger={<Button>Open commands</Button>}
            items={commands}
            footer="↑↓ Navigate · ↵ Run · Esc Close"
          />
        </Demo>
      </Section>
      <Section id="control" title="Application control">
        <p>
          Control open state from the application hotkey registry. Dowel owns
          filtering, focus, keyboard movement, and dismissal; each command keeps
          its own domain action.
        </p>
      </Section>
    </DocsPage>
  );
}
