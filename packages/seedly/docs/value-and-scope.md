# Seedly value and scope (internal)

This document explains **why Seedly exists**, what it is good at, and what it
intentionally does not try to solve.

## Value statement

Seedly exists to make **consistent, accessible, themeable UI** sustainable at
scale. It provides composable primitives with a clear styling surface so teams
can move fast without drifting into bespoke, inconsistent patterns.

Seedly is not about speed to the first UI. It is about **speed to maintainable
UI**.

## Strengths

- **Consistency at scale**: shared primitives reduce design drift across teams.
- **Token-driven theming**: system roles + component contracts enable
  multi-brand or multi-product theming without rewriting markup.
- **Accessible behavior**: wrapping headless primitives (e.g. Radix) provides
  robust interaction patterns out of the box.
- **Composable API**: slots, variants, and responsive patterns create predictable
  integration points.
- **Build-time styling**: Vanilla Extract produces static CSS with type-safe
  contracts.

## Shortcomings and trade-offs

- **Slower iteration** than Tailwind-first or LLM-generated UI for one-off
  screens.
- **Higher onboarding cost**: consumers must learn tokens, contracts, and VE.
- **Less suited to bespoke design**: one-off visual treatments require more work.
- **Wrapper maintenance**: upstream headless changes must be tracked carefully.
- **Not optimized for runtime theming**: compile-time theming is the default.

## Scope boundaries

Seedly focuses on **functional primitives** with a robust styling surface. It is
not a full design system or a complete UI kit.

### In scope

- Accessible, composable primitives with stable APIs.
- System roles and component contracts for structure and appearance.
- Variant, size, tone, and responsive patterns.
- Optional reference themes for bootstrapping.

### Out of scope

- A prescriptive visual design language.
- Rapid prototyping or ad-hoc UI generation.
- Runtime theming as a first-class feature.
- App-specific layouts or product-level design patterns.

## When to use Seedly

- You need **consistency across teams** or products.
- You expect **theme reuse** or multi-brand support.
- You value **maintainable, accessible UI** over quick, bespoke styling.

## When not to use Seedly

- You prioritize **iteration speed** over long-term consistency.
- Your UI is **highly bespoke** and unlikely to be reused.
- You are building a one-off prototype or marketing site.
