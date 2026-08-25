import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  GroupHeader,
  List,
  ListCell,
  ListRow,
  Status,
} from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/list")({
  component: ListDocs,
});

function ListDocs() {
  return (
    <DocsPage
      title="List"
      lead="Semantic grouped rows with constrained cells, selection, density, and truncation."
      toc={[
        { id: "collection", title: "Dense collection" },
        { id: "composition", title: "Composition" },
      ]}
    >
      <Section id="collection" title="Dense collection">
        <Demo
          layout="stack"
          code={`<List aria-label="Repositories" divided>\n  <GroupHeader>Favorites</GroupHeader>\n  <ListRow selected>\n    <Avatar name="Dowel" shape="square" />\n    <ListCell grow truncate>dowel</ListCell>\n    <ListCell tone="tertiary">Updated today</ListCell>\n  </ListRow>\n</List>`}
        >
          <List aria-label="Repositories" divided>
            <GroupHeader>Favorites</GroupHeader>
            <ListRow selected>
              <Avatar name="Dowel" shape="square" size="sm" />
              <ListCell grow truncate>
                dowel
              </ListCell>
              <ListCell tone="tertiary">
                <Status tone="success">Synced</Status>
              </ListCell>
            </ListRow>
            <ListRow>
              <Avatar name="Sourcetown" shape="square" size="sm" />
              <ListCell grow truncate>
                sourcetown
              </ListCell>
              <ListCell tone="tertiary">Updated yesterday</ListCell>
            </ListRow>
          </List>
        </Demo>
      </Section>
      <Section id="composition" title="Composition">
        <p>
          Rows preserve list semantics and own layout only. Put native links,
          buttons, checkboxes, or menus inside cells when a row needs
          interaction.
        </p>
      </Section>
    </DocsPage>
  );
}
