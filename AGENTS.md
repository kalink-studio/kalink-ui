# Codex Agent Notes

- Always run validation scripts after applying repository changes. Prefer the `:fix` variants (`pnpm run format:fix`, `pnpm run lint:fix`) before the read-only counterparts, then finish with `pnpm run tsc`.

## Packages

### Canopy

Hosts Payload CMS elements such as custom fields and custom blocks.

- Whenever you add a new custom field or block to a payload project and the intent is not obvious, you must ask to confirm if it should be added to the canopy package.

### Dibbly

Provides shared TypeScript utilities.

### Seedly

Offers UI React components and a vanilla-extract-based styling system.

### Kalink app

Next.js website backed by Payload CMS.

### Web app

Next.js website backed by Payload CMS that showcases and document the kalink-ui package ecosystem.
