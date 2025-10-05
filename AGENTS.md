# Codex Agent Notes

- **Canopy package**: Hosts Payload CMS elements such as custom fields and custom blocks.
- **Dibbly package**: Provides shared TypeScript utilities.
- **Seedly package**: Offers UI React components and a vanilla-extract-based styling system.
- **Kalink app**: Next.js website backed by Payload CMS.
- **Web app**: Next.js website backed by Payload CMS that showcases the kalink-ui package ecosystem.
- Always run validation scripts after applying repository changes. Prefer the `:fix` variants (`pnpm run format:fix`, `pnpm run lint:fix`) before the read-only counterparts, then finish with `pnpm run tsc`.
