/**
 * What the docs are allowed to say about dowel's version.
 *
 * The number itself is read from packages/dowel/package.json at build time
 * (see the `define` in vite.config.ts), so the badge cannot drift from the
 * package the way a hand-typed one did.
 */

/**
 * changesets has not assigned a version yet, so the manifest still carries
 * the placeholder every unpublished package starts on. Nothing is on npm at
 * this point, which makes "v0.0.0" a number no reader can install.
 */
const UNPUBLISHED = "0.0.0";

/** The raw version from the library manifest, for example `0.2.0`. */
export const dowelVersion = __DOWEL_VERSION__;

/** True once a real version exists, meaning the first publish has happened. */
export const isPublished = dowelVersion !== UNPUBLISHED;

/**
 * The badge copy. "unreleased" while the placeholder is in place, `v` plus
 * the number afterwards. It is a condition on the value rather than a second
 * string to edit, so the first release flips it with no docs change.
 */
export const versionLabel = isPublished ? `v${dowelVersion}` : "unreleased";
