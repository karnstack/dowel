import * as stylex from "@stylexjs/stylex";
import { forwardRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./avatar.stylex";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    "children" | "className" | "style" | "role"
  > {
  name: string;
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

function initialsFor(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toLocaleUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    name,
    src,
    alt = name,
    initials = initialsFor(name),
    size = "md",
    shape = "circle",
    status,
    ...props
  },
  ref,
) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const safeProps = withoutAppearanceProps(props);
  const showImage = Boolean(src) && failedSrc !== src;
  const label = status ? `${alt}, ${status}` : alt;

  return (
    <span
      ref={ref}
      {...safeProps}
      {...stylex.props(
        styles.root.base,
        styles.size[size],
        styles.shape[shape],
      )}
      role="img"
      aria-label={label}
      data-dowel-component="avatar"
      data-size={size}
      data-shape={shape}
    >
      {showImage ? (
        <img
          {...stylex.props(styles.part.image)}
          src={src}
          alt=""
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span {...stylex.props(styles.part.fallback)} aria-hidden="true">
          {initials}
        </span>
      )}
      {status ? (
        <span
          {...stylex.props(styles.part.status, styles.statusTone[status])}
          aria-hidden="true"
          data-status={status}
        />
      ) : null}
    </span>
  );
});
