import { IconButton, Tooltip } from "@karnstack/dowel";
import { useEffect, useState } from "react";

import { tokenize } from "../lib/highlight";
import { CheckIcon, CopyIcon } from "./icons";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  // The confirmation is a timer, so it has to be cleaned up: without this a
  // copy immediately before navigating away sets state on an unmounted tree.
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    // Guarded rather than assumed: the Clipboard API is absent on insecure
    // origins, and a docs page should not throw because it is being read
    // over plain http on someone's LAN.
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // A denied clipboard permission is not worth an error state here.
    }
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <IconButton
            label={copied ? "Copied" : "Copy code"}
            size="sm"
            onClick={copy}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </IconButton>
        }
      />
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup>{copied ? "Copied" : "Copy"}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export type CodeBlockProps = {
  code: string;
  /** Shown in the block's title bar. Also picks the tokenizer's mood. */
  lang?: string;
};

export function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const source = code.trim();
  // Shell snippets have no TSX to find; running the tokenizer over them only
  // produces false positives, so they render as one plain token.
  const tokens =
    lang === "bash" || lang === "css"
      ? [{ kind: "plain" as const, text: source }]
      : tokenize(source);

  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span className="docs-code-lang">{lang}</span>
        <CopyButton value={source} />
      </div>
      <pre className="docs-code-pre">
        <code>
          {tokens.map((t, i) =>
            t.kind === "plain" ? (
              t.text
            ) : (
              <span key={i} className={`tk-${t.kind}`}>
                {t.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
