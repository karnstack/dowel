import { createFileRoute } from "@tanstack/react-router";
import { Field, NativeSelect } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/native-select")({
  component: NativeSelectDocs,
});

const toc = [
  { id: "default", title: "Settings field" },
  { id: "sizes", title: "Sizes" },
  { id: "when", title: "When to use it" },
];

function NativeSelectDocs() {
  return (
    <DocsPage
      title="Native Select"
      lead="The platform select, visually aligned with Dowel inputs and fully resilient in forms."
      toc={toc}
    >
      <Section id="default" title="Settings field">
        <p>
          NativeSelect works inside Field, submits without client JavaScript,
          and uses the operating system picker on touch devices.
        </p>
        <Demo
          layout="stack"
          code={`import { Field, NativeSelect } from "@karnstack/dowel";

<Field.Root>
  <Field.Label>Default branch</Field.Label>
  <NativeSelect name="defaultBranch" defaultValue="main">
    <option value="main">main</option>
    <option value="develop">develop</option>
    <option value="release">release</option>
  </NativeSelect>
  <Field.Description>New merge requests target this branch.</Field.Description>
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Default branch</Field.Label>
            <NativeSelect name="defaultBranch" defaultValue="main">
              <option value="main">main</option>
              <option value="develop">develop</option>
              <option value="release">release</option>
            </NativeSelect>
            <Field.Description>
              New merge requests target this branch.
            </Field.Description>
          </Field.Root>
        </Demo>
      </Section>

      <Section id="sizes" title="Sizes">
        <Demo
          layout="stack"
          code={`<NativeSelect aria-label="Compact provider" size="sm"><option>GitHub</option></NativeSelect>
<NativeSelect aria-label="Default provider"><option>GitHub</option></NativeSelect>
<NativeSelect aria-label="Prominent provider" size="lg"><option>GitHub</option></NativeSelect>`}
        >
          <NativeSelect aria-label="Compact provider" size="sm">
            <option>GitHub</option>
          </NativeSelect>
          <NativeSelect aria-label="Default provider">
            <option>GitHub</option>
          </NativeSelect>
          <NativeSelect aria-label="Prominent provider" size="lg">
            <option>GitHub</option>
          </NativeSelect>
        </Demo>
      </Section>

      <Section id="when" title="When to use it">
        <p>
          Prefer NativeSelect for short, familiar option sets and forms that
          must remain useful before hydration. Use Select when descriptions,
          grouping, or styled popup rows materially improve the choice.
        </p>
      </Section>
    </DocsPage>
  );
}
