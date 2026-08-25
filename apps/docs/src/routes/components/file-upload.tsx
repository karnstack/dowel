import { createFileRoute } from "@tanstack/react-router";
import { FileUpload } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/file-upload")({
  component: FileUploadDocs,
});

function FileUploadDocs() {
  return (
    <DocsPage
      title="File Upload"
      lead="A native file picker and dropzone with type, size, count, and duplicate validation."
      toc={[{ id: "default", title: "Dropzone" }]}
    >
      <Section id="default" title="Dropzone">
        <Demo
          layout="stack"
          code={`<FileUpload\n  multiple\n  accept="image/*,.pdf"\n  maxFiles={3}\n  maxSize={5 * 1024 * 1024}\n  description="PNG, JPG, or PDF up to 5 MB"\n/>`}
        >
          <FileUpload
            multiple
            accept="image/*,.pdf"
            maxFiles={3}
            maxSize={5 * 1024 * 1024}
            description="PNG, JPG, or PDF up to 5 MB"
          />
        </Demo>
      </Section>
    </DocsPage>
  );
}
