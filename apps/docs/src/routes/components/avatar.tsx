import { createFileRoute } from "@tanstack/react-router";
import { Avatar } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/avatar")({
  component: AvatarDocs,
});

const toc = [
  { id: "images", title: "Images and fallbacks" },
  { id: "sizes", title: "Sizes and presence" },
];

const avatarPhoto =
  "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&crop=faces&fit=crop&h=96&q=80&w=96";

function AvatarDocs() {
  return (
    <DocsPage
      title="Avatar"
      lead="A person or organization image with deterministic initials, shape, size, and presence fallbacks."
      toc={toc}
    >
      <Section id="images" title="Images and fallbacks">
        <p>
          Pass a source for a portrait and a name for its accessible label. A
          missing or failed image returns to generated initials automatically.
        </p>
        <Demo
          code={`<Avatar name="Maya Chen" src={portraitUrl} />
<Avatar name="Grace Hopper" shape="square" />
<Avatar name="Lin Chen" initials="LC" />`}
        >
          <Avatar name="Maya Chen" src={avatarPhoto} />
          <Avatar name="Grace Hopper" shape="square" />
          <Avatar name="Lin Chen" initials="LC" />
        </Demo>
        <p>
          Demo portrait by{" "}
          <a href="https://unsplash.com/@wocintechchat?utm_source=dowel&utm_medium=referral">
            Christina @ wocintechchat.com M
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/?utm_source=dowel&utm_medium=referral">
            Unsplash
          </a>
          .
        </p>
      </Section>

      <Section id="sizes" title="Sizes and presence">
        <p>
          Four sizes cover dense rows through prominent profile surfaces.
          Presence becomes part of the avatar's accessible name.
        </p>
        <Demo
          code={`<Avatar name="Ada Lovelace" size="xs" status="online" />
<Avatar name="Grace Hopper" size="sm" status="away" />
<Avatar name="Lin Chen" size="md" status="busy" />
<Avatar name="Sam Rivera" size="lg" status="offline" />`}
        >
          <Avatar name="Ada Lovelace" size="xs" status="online" />
          <Avatar name="Grace Hopper" size="sm" status="away" />
          <Avatar name="Lin Chen" size="md" status="busy" />
          <Avatar name="Sam Rivera" size="lg" status="offline" />
        </Demo>
      </Section>
    </DocsPage>
  );
}
