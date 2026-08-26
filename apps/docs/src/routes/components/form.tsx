import { createFileRoute } from "@tanstack/react-router";
import { useDowelForm } from "@karnstack/dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/form")({
  component: FormDocs,
});

const toc = [
  { id: "composed-form", title: "Composed form" },
  { id: "field-components", title: "Field components" },
];

function IssueForm() {
  const [savedTitle, setSavedTitle] = useState("");
  const form = useDowelForm({
    defaultValues: {
      title: "",
      description: "",
    },
    onSubmit: ({ value }) => setSavedTitle(value.title),
  });

  return (
    <div className="docs-form-demo">
      <form.AppForm>
        <form.Root aria-label="Create issue">
          <form.AppField
            name="title"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : "Title is required",
            }}
          >
            {(field) => (
              <field.TextField
                label="Title"
                description="Describe the outcome in a few words."
                placeholder="Improve table keyboard navigation"
              />
            )}
          </form.AppField>
          <form.AppField name="description">
            {(field) => (
              <field.TextareaField
                label="Description"
                placeholder="Add context and acceptance criteria"
              />
            )}
          </form.AppField>
          <form.Actions>
            <form.SubmitButton>Create issue</form.SubmitButton>
          </form.Actions>
        </form.Root>
      </form.AppForm>
      {savedTitle ? (
        <p className="docs-form-result" role="status">
          Created “{savedTitle}”
        </p>
      ) : null}
    </div>
  );
}

function FormDocs() {
  return (
    <DocsPage
      title="Form"
      lead="TanStack Form state and validation with Dowel fields, errors, actions, and submit behavior pre-bound."
      toc={toc}
    >
      <Section id="composed-form" title="Composed form">
        <p>
          <code>useDowelForm</code> keeps TanStack Form&apos;s typed state model
          while removing the repetitive wiring between fields and Dowel
          controls.
        </p>
        <Demo
          layout="start"
          code={`const form = useDowelForm({
  defaultValues: { title: "", description: "" },
  onSubmit: ({ value }) => createIssue(value),
});

<form.AppForm>
  <form.Root>
    <form.AppField
      name="title"
      validators={{
        onBlur: ({ value }) => value ? undefined : "Title is required",
      }}
    >
      {(field) => <field.TextField label="Title" />}
    </form.AppField>
    <form.AppField name="description">
      {(field) => <field.TextareaField label="Description" />}
    </form.AppField>
    <form.Actions>
      <form.SubmitButton>Create issue</form.SubmitButton>
    </form.Actions>
  </form.Root>
</form.AppForm>`}
        >
          <IssueForm />
        </Demo>
      </Section>

      <Section id="field-components" title="Field components">
        <p>
          The adapter currently includes <code>TextField</code> and{" "}
          <code>TextareaField</code>. Both bind value, blur, name, touched
          validation, descriptions, and accessible error output. Use{" "}
          <code>withDowelForm</code> and <code>withDowelFieldGroup</code> to
          compose reusable forms without losing inferred value types.
        </p>
      </Section>
    </DocsPage>
  );
}
