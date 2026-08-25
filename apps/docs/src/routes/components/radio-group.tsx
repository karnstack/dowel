import { createFileRoute } from "@tanstack/react-router";
import { RadioGroup } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/radio-group")({
  component: RadioGroupDocs,
});

const toc = [
  { id: "choices", title: "Choices" },
  { id: "layout", title: "Layout" },
  { id: "keyboard", title: "Keyboard" },
];

function RadioGroupDocs() {
  return (
    <DocsPage
      title="Radio Group"
      lead="One choice from a visible set, with roving focus, arrow-key selection, and native form values."
      toc={toc}
    >
      <Section id="choices" title="Choices">
        <p>
          Use radio choices when all available options should remain visible.
          Select and Combobox are better when the set is long or searchable.
        </p>
        <Demo
          layout="stack"
          code={`import { RadioGroup } from "@karnstack/dowel";

<RadioGroup.Root
  aria-label="Repository visibility"
  name="visibility"
  defaultValue="private"
>
  <label><RadioGroup.Item value="private" /> Private</label>
  <label><RadioGroup.Item value="internal" /> Internal</label>
  <label><RadioGroup.Item value="public" /> Public</label>
</RadioGroup.Root>`}
        >
          <RadioGroup.Root
            aria-label="Repository visibility"
            name="visibility"
            defaultValue="private"
          >
            <label className="docs-choice-label">
              <RadioGroup.Item value="private" /> Private
            </label>
            <label className="docs-choice-label">
              <RadioGroup.Item value="internal" /> Internal
            </label>
            <label className="docs-choice-label">
              <RadioGroup.Item value="public" /> Public
            </label>
          </RadioGroup.Root>
        </Demo>
      </Section>

      <Section id="layout" title="Layout">
        <p>
          Vertical is the default for settings and forms. Horizontal is for a
          short set whose labels remain clear at narrow widths.
        </p>
        <Demo
          code={`<RadioGroup.Root
  aria-label="Merge strategy"
  orientation="horizontal"
  defaultValue="merge"
>
  <label><RadioGroup.Item value="merge" /> Merge</label>
  <label><RadioGroup.Item value="fast-forward" /> Fast-forward</label>
</RadioGroup.Root>`}
        >
          <RadioGroup.Root
            aria-label="Merge strategy"
            orientation="horizontal"
            defaultValue="merge"
          >
            <label className="docs-choice-label">
              <RadioGroup.Item value="merge" /> Merge
            </label>
            <label className="docs-choice-label">
              <RadioGroup.Item value="fast-forward" /> Fast-forward
            </label>
          </RadioGroup.Root>
        </Demo>
      </Section>

      <Section id="keyboard" title="Keyboard">
        <p>
          Tab enters the selected option. Arrow keys move focus and selection.
          Space selects the focused option. Disabled choices are skipped.
        </p>
      </Section>
    </DocsPage>
  );
}
