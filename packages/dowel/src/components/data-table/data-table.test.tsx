import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { DataTable, createDataTableColumnHelper } from "./index";

type Issue = {
  id: string;
  title: string;
  priority: number;
};

const helper = createDataTableColumnHelper<Issue>();
const columns = helper.columns([
  helper.accessor("id", {
    header: "Issue",
    size: 88,
    meta: { mono: true, tone: "tertiary" },
  }),
  helper.accessor("title", {
    header: "Title",
    size: 280,
    meta: { grow: true },
  }),
  helper.accessor("priority", {
    header: "Priority",
    size: 96,
    meta: { align: "end", tone: "secondary" },
  }),
]);

const issues: Issue[] = [
  { id: "APP-12", title: "Add keyboard navigation", priority: 2 },
  { id: "APP-4", title: "Polish the empty state", priority: 1 },
];

function Example(
  props: Partial<React.ComponentProps<typeof DataTable<Issue>>>,
) {
  return (
    <DataTable
      aria-label="Issues"
      columns={columns}
      data={issues}
      getRowId={(issue) => issue.id}
      {...props}
    />
  );
}

describe("DataTable", () => {
  it("renders semantic headers and rows", () => {
    render(<Example />);
    expect(screen.getByRole("table", { name: "Issues" })).toBeDefined();
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Add keyboard navigation")).toBeDefined();
  });

  it("sorts rows from a column header", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: /priority/i }));
    const rows = screen.getAllByRole("row").slice(1);
    expect(within(rows[0]!).getByText("Polish the empty state")).toBeDefined();
    expect(
      screen
        .getByRole("columnheader", { name: /priority/i })
        .getAttribute("aria-sort"),
    ).toBe("ascending");
  });

  it("sorts text columns with the registered automatic comparator", async () => {
    render(<Example sorting={[{ id: "title", desc: false }]} />);
    const rows = screen.getAllByRole("row").slice(1);
    expect(within(rows[0]!).getByText("Add keyboard navigation")).toBeDefined();
    expect(within(rows[1]!).getByText("Polish the empty state")).toBeDefined();
  });

  it("selects one row and all rows with accessible checkboxes", async () => {
    const onRowSelectionChange = vi.fn();
    render(<Example selectable onRowSelectionChange={onRowSelectionChange} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[1]!);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    expect(checkboxes[1]?.closest("tr")?.hasAttribute("data-selected")).toBe(
      true,
    );
    expect(onRowSelectionChange).toHaveBeenCalled();

    await userEvent.click(checkboxes[0]!);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    expect((checkboxes[2] as HTMLInputElement).checked).toBe(true);
  });

  it("resizes columns with the keyboard", async () => {
    render(<Example />);
    const handle = screen.getByRole("separator", {
      name: "Resize id column",
    });
    expect(handle.getAttribute("aria-valuenow")).toBe("88");
    handle.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(handle.getAttribute("aria-valuenow")).toBe("96");
    await userEvent.keyboard("{Home}");
    expect(handle.getAttribute("aria-valuenow")).toBe("48");
  });

  it("supports controlled column order, pinning, and sizing", async () => {
    const onColumnSizingChange = vi.fn();
    render(
      <Example
        columnOrder={["priority", "title", "id"]}
        columnPinning={{ start: ["priority"], end: [] }}
        columnSizing={{ priority: 104 }}
        onColumnSizingChange={onColumnSizingChange}
      />,
    );
    const headers = screen.getAllByRole("columnheader");
    expect(within(headers[0]!).getByText("Priority")).toBeDefined();
    expect(headers[0]?.getAttribute("style")).toContain("inset-inline-start");

    const handle = screen.getByRole("separator", {
      name: "Resize priority column",
    });
    handle.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onColumnSizingChange).toHaveBeenCalled();
  });

  it("renders collapsible row groups", async () => {
    render(
      <Example
        groupBy={(issue) => ({
          id: String(issue.priority),
          label: `Priority ${issue.priority}`,
        })}
      />,
    );
    const group = screen.getByRole("button", { name: /Priority 21/ });
    expect(group.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getAllByRole("row")).toHaveLength(5);
    await userEvent.click(group);
    expect(group.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(screen.queryByText("Add keyboard navigation")).toBeNull();
  });

  it("uses roving row focus and shift-arrow range selection", async () => {
    render(<Example selectable />);
    const rows = screen.getAllByRole("row").slice(1);
    (rows[0] as HTMLTableRowElement).focus();
    await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
    expect(document.activeElement).toBe(rows[1]);
    const checkboxes = screen.getAllByRole("checkbox").slice(1);
    expect((checkboxes[0] as HTMLInputElement).checked).toBe(true);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
  });

  it("reveals row actions on hover and supports sticky headers", async () => {
    render(
      <Example
        stickyHeader
        renderRowActions={(issue) => (
          <button type="button">Archive {issue.id}</button>
        )}
      />,
    );
    const root = screen.getByRole("table").parentElement!;
    expect(root.hasAttribute("data-sticky-header")).toBe(true);
    const firstRow = screen.getAllByRole("row")[1]!;
    await userEvent.hover(firstRow);
    expect(
      screen
        .getByRole("toolbar", { name: "Actions for row 1" })
        .hasAttribute("data-visible"),
    ).toBe(true);
  });

  it("activates actionable rows without hijacking embedded controls", async () => {
    const onRowActivate = vi.fn();
    render(<Example selectable onRowActivate={onRowActivate} />);
    await userEvent.click(screen.getByText("Add keyboard navigation"));
    expect(onRowActivate).toHaveBeenCalledWith(issues[0]);

    await userEvent.click(screen.getByLabelText("Select row 1"));
    expect(onRowActivate).toHaveBeenCalledTimes(1);
  });

  it("renders deliberate loading and empty states", () => {
    const { rerender } = render(<Example loading loadingRows={3} />);
    expect(screen.getByRole("table").getAttribute("aria-busy")).toBe("true");
    expect(screen.getAllByRole("row")).toHaveLength(4);

    rerender(
      <Example
        data={[]}
        emptyTitle="Nothing here"
        emptyDescription="Try a different filter."
      />,
    );
    expect(screen.getByText("Nothing here")).toBeDefined();
    expect(screen.getByText("Try a different filter.")).toBeDefined();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example selectable />);
    await expectNoA11yViolations(container);
  });
});
