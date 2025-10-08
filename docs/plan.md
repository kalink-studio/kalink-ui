# Kalink Migration Plan

## Objectives

- Merge the legacy `~/dev/kalink` Next.js + Prismic site into `apps/kalink` inside the monorepo.
- Replace Prismic with Payload CMS while keeping Next.js (App Router) and aligning with workspace tooling.
- Reuse primitives, utilities, and design tokens from `@kalink-ui/seedly` and `@kalink-ui/dibbly` to avoid duplicated UI logic.
- Adopt vanilla-extract for all local styling; keep image handling simple (single media field per asset) for this phase.

## Active Work – Canopy Plugins

- Align `@kalink-ui/canopy` with Payload’s plugin authoring guide so packages can ship self-contained enhancements.
- Extract the slug field into a Payload plugin that registers hooks and admin components via the documented `PayloadPlugin` signature.
- Expose a future-friendly plugin barrel (e.g., `plugins/slug`) and keep shared helpers internal to avoid duplicate admin bundles.
- Update `apps/kalink` payload config to consume the slug plugin and drop direct field wiring in collection definitions.

## Phase Overview

1. **Baseline & Dependencies** – Sync package versions, add vanilla-extract support to `apps/kalink`, and ensure Payload admin runs locally.
2. **Payload Data Model** – Port custom types to collections/globals, establish relationships, and generate TypeScript types.
3. **Block Library** – Translate Prismic slices into Payload blocks and build matching React renderers backed by Seedly components.
4. **Frontend Layout & Navigation** – Recreate layout, metadata, navbar, footer, and sub-navigation behavior using Payload data.
5. **Forms & Integrations** – Port contact form (Resend), map locator, toast system, and any other client-side services.
6. **Commerce Endpoints** _(if still required)_ – Migrate Stripe-powered endpoints under `/shop` to Payload/Next.
7. **Content Migration & QA** – Script/import existing Prismic content into Payload, verify routes, styling, and accessibility.
8. **Handoff** – Document admin usage, deployment steps, and remaining backlog (e.g., responsive media ratios).

## Dependency Tasks

### Already in workspace

- `payload`, `@payloadcms/*`, Next 15 / React 19 runtime.
- Workspace packages `@kalink-ui/seedly`, `@kalink-ui/dibbly` (bring UI primitives + utilities).

### Install / update in `apps/kalink`

- Vanilla extract toolchain: `@vanilla-extract/next-plugin`, `@vanilla-extract/css`, `@vanilla-extract/sprinkles`, `@vanilla-extract/recipes`, `@vanilla-extract/css-utils`, `@vanilla-extract/dynamic`.
- UI helpers: `clsx`, `framer-motion`, `@uidotdev/usehooks`, `lucide-react`, `simplebar-react`.
- Forms & comms: `react-hook-form`, `resend`.
- Map: `@vis.gl/react-google-maps`.
- Commerce (pending confirmation): `stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`.
- Radix primitives not provided by Seedly exports but used by legacy components: `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-toast`, `@radix-ui/react-label`, `@radix-ui/react-scroll-area`, `@radix-ui/react-slot`.
- Configure `next.config.ts` with `createVanillaExtractPlugin()` and `transpilePackages` for `@kalink-ui/*`.

## Data Model Mapping (Prismic → Payload)

| Prismic custom type  | Payload target                                            | Key fields                                                                                                                                                                           | Notes                                                                                  |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `page`               | `pages` collection                                        | `title`, `slug` (from UID), `navigationLabel`, `tint` (`primary` \| `secondary`), SEO group (`metaTitle`, `metaDescription`, `metaImage` upload), `blocks` (array of Payload blocks) | All standard pages; enforce unique slugs; expose boolean `showInNavigation` if needed. |
| `homepage`           | `pages` collection (singleton entry flagged `isHomepage`) | Same as `page` plus `isHomepage` boolean                                                                                                                                             | Allows reuse of renderer; homepage resolved by `isHomepage = true`.                    |
| `service`            | `services` collection                                     | `title`, `slug`, `backgroundTint`, `picture` (upload)                                                                                                                                | Used inside Services Grid block.                                                       |
| `serviceDescription` | `serviceDescriptions` collection                          | `title`, `description`, `backgroundTint`                                                                                                                                             | Linkable from Services Grid items.                                                     |
| `person`             | `people` collection                                       | `givenName`, `surname`, `jobTitle`, `summary` (Lexical rich text), `picture`                                                                                                         | Consumed by Team block.                                                                |
| `testimonial`        | `testimonials` collection                                 | `givenName`, `text`                                                                                                                                                                  | Consumed by Testimonials Row block.                                                    |
| `courseSessions`     | `courseSessions` collection                               | `title`/`slug`, `items` (array `{ label, value }`)                                                                                                                                   | Supplies select options for contact form fields.                                       |
| `mainNavigation`     | `mainNavigation` **global**                               | `items` array of relationships to `pages` with ordering                                                                                                                              | Powers navbar structure; manage via Payload global admin view.                         |
| (Media)              | `media` collection (already present)                      | `alt`, file upload                                                                                                                                                                   | Reuse for all image fields.                                                            |
| (Users)              | `users` collection (already present)                      | auth                                                                                                                                                                                 | No change.                                                                             |

## Slice → Block Mapping

| Prismic slice                             | Payload block slug            | Fields                                                                                                                                                                                                                                                                                | Component/notes                                                                               |
| ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `intro_block` (default & withLinkToMedia) | `introBlock`                  | Shared: `title`, `body` (rich text), `backgroundTint`, sub-nav fields (`showInSubnav`, `subnavLabel`, `slug`). Variant: `ctas` array (`label`, `media` relationship, `variant`).                                                                                                      | Render with Seedly `Container`/`Stack` primitives; CTA variant optional.                      |
| `media_banner`                            | `mediaBanner`                 | `items` repeatable group: `title`, `body` rich text, `image` upload, `direction`, sub-nav metadata.                                                                                                                                                                                   | Rebuild carousel-style layout; use Seedly `Grid`, `Frame`.                                    |
| `fifty_fifty_section`                     | `fiftyFifty`                  | `title`, `body` rich text, `image`, `direction`, `backgroundTint`, sub-nav metadata.                                                                                                                                                                                                  | Layout with Seedly `Grid`/`Box`.                                                              |
| `list_items`                              | `listItems`                   | `title`, `backgroundTint`, sub-nav metadata, `items` array `{ label }`.                                                                                                                                                                                                               | Use Seedly `Stack` + `Text`.                                                                  |
| `contacts`                                | `contacts`                    | `title`, `subtitle`, `backgroundTint`, sub-nav metadata, `info` rich text, `formType` (`message` \| `inscription`), `formFields` array (`fieldType`, `fieldName`, `fieldLabel`, `required`, `optionsSource` relationship to `courseSessions`), `location` point, map config booleans. | Google Maps API key and map ID pulled from env vars at runtime; block only toggles map usage. |
| `team`                                    | `team`                        | `title`, sub-nav metadata, `items` array with `person` relationship, `direction`, `backgroundTint`.                                                                                                                                                                                   | Render using Person cards from Seedly primitives.                                             |
| `testimonials_row`                        | `testimonialsRow`             | `title`, sub-nav metadata, `items` array with `testimonial` relationship + `tintScheme`.                                                                                                                                                                                              | Build scrolling row using `Stack`/`SimpleBar`.                                                |
| `grid` (ServicesGrid)                     | `servicesGrid`                | `title`, sub-nav metadata, `items` array referencing either `service` or `serviceDescription`, with display variant.                                                                                                                                                                  | Combine cards reused from library.                                                            |
| `contacts` map                            | handled inside contacts block | Expose `mapApiKey`, `mapId` fields for Google map integration.                                                                                                                                                                                                                        |

## Implementation Notes

- Centralise block definitions under `apps/kalink/blocks` with shared field fragments, mirroring legacy slice directory structure for easier porting.
- Generate Payload types (`payload-types.ts`) and create Zod/TypeScript adapters for frontend block props.
- Expose a `resolveBlocks` helper that maps Payload block entries to React components (akin to Prismic `SliceZone`).
- Build layout primitives (`LayoutShell`, `Navbar`, `Footer`) consuming Payload queries; reuse `Seedly` Box/Stack/Text/Button` throughout and keep bespoke styles in vanilla-extract files adjacent to components.
- Implement navigation slug helpers (`slugify`, `getBlockSlug`) using `@kalink-ui/dibbly` utilities.
- Keep image fields single-file for now; plan responsive/crop enhancements later.

## Decisions

- `mainNavigation` will be implemented as a Payload global.
- Stripe-powered `/shop` endpoints are out of scope for this pass; drop during migration and reintroduce later if required.
- Google Maps API key and map ID stay in environment variables; Payload content only enables/labels map usage.
- Content migration will be manual via Payload admin.

## Next Steps

- Lock dependency list and update `apps/kalink` configuration.
- Begin implementing Payload collections/blocks in the order above, followed by frontend renderers phase-by-phase.

## WIP Snapshot (2025-02-14)

- Payload collections, blocks, globals, and frontend scaffold migrated; React blocks render using Seedly/Dibbly primitives with vanilla-extract styles.
- CMS helpers (`lib/cms.ts`) fetch Payload data; navigation + anchors + layout/footer implemented.
- `contact-form` client component wired to Resend server action; map locator added.
- Outstanding: resolve ESLint import-order/type warnings, polish typings (`types/cms.ts`), finish block renderers (media handling, tint composition), and rerun `pnpm lint` once fixes are in.
