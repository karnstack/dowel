export function withoutAppearanceProps<T extends object>(
  props: T,
): Omit<T, "className" | "style"> {
  const {
    className: _className,
    style: _style,
    ...safeProps
  } = props as T & { className?: unknown; style?: unknown };
  return safeProps;
}
