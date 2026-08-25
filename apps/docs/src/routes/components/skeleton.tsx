import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/skeleton")({
  component: SkeletonDocs,
});

const toc = [
  { id: "variants", title: "Variants" },
  { id: "accessibility", title: "Accessibility" },
];

function SkeletonDocs() {
  return (
    <DocsPage
      title="Skeleton"
      lead="A quiet loading placeholder that preserves rough content shape without pretending to be content."
      toc={toc}
    >
      <Section id="variants" title="Variants">
        <p>
          Text fills its line, block preserves a larger region, and circle
          stands in for compact imagery such as an avatar.
        </p>
        <Demo
          layout="stack"
          code={`<Skeleton variant="circle" />
<Skeleton />
<Skeleton size="sm" />
<Skeleton variant="block" size="sm" />`}
        >
          <Skeleton variant="circle" />
          <Skeleton />
          <Skeleton size="sm" />
          <Skeleton variant="block" size="sm" />
        </Demo>
      </Section>

      <Section id="accessibility" title="Accessibility">
        <p>
          Skeletons are decorative and hidden from assistive technology. Name
          the containing loading region, and replace the placeholders when real
          content arrives. The pulse stops under reduced motion.
        </p>
      </Section>
    </DocsPage>
  );
}
