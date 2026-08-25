import { createFileRoute } from "@tanstack/react-router";
import { Slider } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/slider")({
  component: SliderDocs,
});

function SliderDocs() {
  return (
    <DocsPage
      title="Slider"
      lead="A precise pointer and keyboard control for values across a numeric range."
      toc={[{ id: "default", title: "Numeric range" }]}
    >
      <Section id="default" title="Numeric range">
        <Demo
          layout="stack"
          code={`<Slider.Root defaultValue={40}>\n  <Slider.Label>Volume</Slider.Label>\n  <Slider.Value />\n  <Slider.Control>\n    <Slider.Track><Slider.Indicator /></Slider.Track>\n    <Slider.Thumb aria-label="Volume" />\n  </Slider.Control>\n</Slider.Root>`}
        >
          <Slider.Root defaultValue={40}>
            <Slider.Label>Volume</Slider.Label>
            <Slider.Value />
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb aria-label="Volume" />
            </Slider.Control>
          </Slider.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
