import { Toast as BaseToast } from "@base-ui/react/toast";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useContext } from "react";
import type { ReactNode } from "react";
import type {
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastRootToastObject,
} from "@base-ui/react/toast";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./toast.stylex";

export type ToastTone =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "loading";
type ToastData = Record<string, never>;
export interface ToastOptions
  extends Omit<ToastManagerAddOptions<ToastData>, "title" | "type"> {
  description?: ReactNode;
  tone?: ToastTone;
}
export interface ToastUpdateOptions
  extends Omit<ToastManagerUpdateOptions<ToastData>, "type"> {
  tone?: ToastTone;
}
export interface ToastProviderProps {
  children?: ReactNode;
  timeout?: number;
  limit?: number;
  manager?: ToastManager<ToastData>;
}

const globalManager = BaseToast.createToastManager<ToastData>();

function addToast(title: ReactNode, options: ToastOptions = {}) {
  const { tone = "default", ...rest } = options;
  return globalManager.add({ ...rest, title, type: tone });
}

export const toast = Object.assign(addToast, {
  success: (title: ReactNode, options: Omit<ToastOptions, "tone"> = {}) =>
    addToast(title, { ...options, tone: "success" }),
  info: (title: ReactNode, options: Omit<ToastOptions, "tone"> = {}) =>
    addToast(title, { ...options, tone: "info" }),
  warning: (title: ReactNode, options: Omit<ToastOptions, "tone"> = {}) =>
    addToast(title, { ...options, tone: "warning" }),
  error: (title: ReactNode, options: Omit<ToastOptions, "tone"> = {}) =>
    addToast(title, {
      ...options,
      tone: "danger",
      priority: options.priority ?? "high",
    }),
  loading: (title: ReactNode, options: Omit<ToastOptions, "tone"> = {}) =>
    addToast(title, {
      ...options,
      tone: "loading",
      timeout: options.timeout ?? 0,
    }),
  dismiss: (id?: string) => globalManager.close(id),
  update: (id: string, options: ToastUpdateOptions) => {
    const { tone, ...rest } = options;
    globalManager.update(id, tone ? { ...rest, type: tone } : rest);
  },
  promise: <Value,>(
    promise: Promise<Value>,
    options: ToastManagerPromiseOptions<Value, ToastData>,
  ) => globalManager.promise(promise, options),
});

function sx(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

function ToneIcon({ tone }: { tone: ToastTone }) {
  const iconProps = { width: 16, height: 16 };
  if (tone === "success") return <CheckCircleIcon {...iconProps} />;
  if (tone === "warning") return <ExclamationTriangleIcon {...iconProps} />;
  if (tone === "danger") return <ExclamationCircleIcon {...iconProps} />;
  if (tone === "info") return <InformationCircleIcon {...iconProps} />;
  if (tone === "loading") return <span {...sx(styles.toast.spinner)} />;
  return null;
}

function ToastItem({ item }: { item: ToastRootToastObject<ToastData> }) {
  const tone = (
    item.type === "error" ? "danger" : (item.type ?? "default")
  ) as ToastTone;
  return (
    <BaseToast.Root
      toast={item}
      {...sx(styles.toast.root)}
      data-dowel-component="toast"
      swipeDirection={["down", "right"]}
    >
      <BaseToast.Content {...sx(styles.toast.content)}>
        {tone !== "default" ? (
          <span
            {...sx(
              styles.toast.icon,
              styles.toast[tone === "loading" ? "info" : tone],
            )}
            aria-hidden="true"
          >
            <ToneIcon tone={tone} />
          </span>
        ) : null}
        <span {...sx(styles.toast.text)}>
          <BaseToast.Title {...sx(styles.toast.title)} />
          <BaseToast.Description {...sx(styles.toast.description)} />
        </span>
        <span {...sx(styles.toast.controls)}>
          {item.actionProps ? (
            <BaseToast.Action {...sx(styles.toast.action)} />
          ) : null}
          <BaseToast.Close
            {...sx(styles.toast.close)}
            aria-label="Dismiss notification"
          >
            <XMarkIcon width={14} height={14} />
          </BaseToast.Close>
        </span>
      </BaseToast.Content>
    </BaseToast.Root>
  );
}

function ToastViewport() {
  const { toasts } = BaseToast.useToastManager<ToastData>();
  const theme = useContext(DowelThemeContext);
  const portalTheme = stylex.props(themeStyles[theme]);
  return (
    <BaseToast.Portal
      className={portalTheme.className}
      style={portalTheme.style}
      data-dowel-theme={theme}
    >
      <BaseToast.Viewport
        {...sx(styles.toast.viewport)}
        data-dowel-component="toast-viewport"
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} />
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export function ToastProvider({
  children,
  timeout = 5000,
  limit = 3,
  manager = globalManager,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit} toastManager={manager}>
      {children}
      <ToastViewport />
    </BaseToast.Provider>
  );
}

export { globalManager as toastManager };
