import {
  ArrowUpTrayIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import * as styles from "./file-upload.stylex";

export type FileRejectReason = "type" | "size" | "count";
export interface RejectedFile {
  file: File;
  reason: FileRejectReason;
}
export interface FileUploadProps {
  label?: ReactNode;
  description?: ReactNode;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  onReject?: (rejected: RejectedFile[]) => void;
}
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
function accepts(file: File, accept?: string) {
  if (!accept) return true;
  return accept
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .some((part) =>
      part.startsWith(".")
        ? file.name.toLowerCase().endsWith(part)
        : part.endsWith("/*")
          ? file.type.toLowerCase().startsWith(part.slice(0, -1))
          : file.type.toLowerCase() === part,
    );
}
function sizeLabel(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
export function FileUpload({
  label = "Drop files here or browse",
  description,
  accept,
  multiple = false,
  maxFiles = multiple ? Infinity : 1,
  maxSize = Infinity,
  disabled,
  onFilesChange,
  onReject,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  function commit(incoming: File[]) {
    const rejected: RejectedFile[] = [];
    const accepted = incoming.filter((file) => {
      if (!accepts(file, accept)) {
        rejected.push({ file, reason: "type" });
        return false;
      }
      if (file.size > maxSize) {
        rejected.push({ file, reason: "size" });
        return false;
      }
      return true;
    });
    const combined = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
    const unique = combined.filter(
      (file, index, all) =>
        all.findIndex(
          (candidate) =>
            candidate.name === file.name &&
            candidate.size === file.size &&
            candidate.lastModified === file.lastModified,
        ) === index,
    );
    const next = unique.slice(0, maxFiles);
    unique
      .slice(maxFiles)
      .forEach((file) => rejected.push({ file, reason: "count" }));
    setFiles(next);
    onFilesChange?.(next);
    if (rejected.length) onReject?.(rejected);
  }
  function change(event: ChangeEvent<HTMLInputElement>) {
    commit([...(event.target.files ?? [])]);
    event.target.value = "";
  }
  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled) return;
    setDragging(false);
    commit([...event.dataTransfer.files]);
  }
  function remove(index: number) {
    const next = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(next);
    onFilesChange?.(next);
  }
  return (
    <div {...sx(styles.upload.root)} data-dowel-component="file-upload">
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            setDragging(false);
        }}
        onDrop={drop}
        {...sx(
          styles.upload.dropzone,
          dragging && styles.upload.dragging,
          disabled && styles.upload.disabled,
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={change}
          {...sx(styles.upload.input)}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          {...sx(styles.upload.browse)}
        >
          <ArrowUpTrayIcon width={16} height={16} aria-hidden="true" />
          <span>{label}</span>
        </button>
        {description ? (
          <span {...sx(styles.upload.description)}>{description}</span>
        ) : null}
      </div>
      {files.length ? (
        <ul aria-label="Selected files" {...sx(styles.upload.list)}>
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              {...sx(styles.upload.file)}
            >
              <DocumentIcon
                width={14}
                height={14}
                aria-hidden="true"
                {...sx(styles.upload.fileIcon)}
              />
              <span {...sx(styles.upload.fileName)}>{file.name}</span>
              <span {...sx(styles.upload.fileSize)}>
                {sizeLabel(file.size)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => remove(index)}
                {...sx(styles.upload.remove)}
              >
                <XMarkIcon width={14} height={14} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
export const Dropzone = FileUpload;
