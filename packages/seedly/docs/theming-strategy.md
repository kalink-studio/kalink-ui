# Seedly theming strategy (internal)

This document explains Seedly’s **theming philosophy** and the intended balance
between being “unstyled” and still offering strong, composable primitives.

## Goal

Seedly aims to be **opinionated on functionality** but **neutral on appearance**.
Components should be usable out-of-the-box, while giving consumers complete
control of styling through Vanilla Extract contracts.

## Core principles

### 1) Separate structure from appearance

- **Structure** = layout, DOM shape, spacing relationships, focus handling, and
  accessibility.
- **Appearance** = color, borders, radius, shadows, typography, and decorative
  effects.

**Rule:** both structure and appearance must be expressed through system tokens
and component vars so they are fully overridable. The separation is
organizational, not technical.

### 2) System tokens are semantic and minimal

- `sys` represents **semantic roles**, not palettes.
- Roles must stay neutral so Seedly is not locked to any single design language.
- Consumers map their `refs` layer into `sys.surface`, `sys.tone`, and other
  system roles in userland.

### 3) Component contracts carry the styling surface

- `ComponentVars` are the primary styling API.
- Variants should **assign vars**, not hard-code raw values.
- Slots are opt-in escape hatches for structured components.

### 4) Optional presets, never mandatory

Seedly can ship a **reference theme** as an optional layer. It must live
separately from contracts so consumers can ignore or replace it.

## What “unstyled” means in Seedly

Seedly is **unstyled in appearance**, not in structure. Components should:

- Provide accessible structure and layout.
- Avoid locking consumers into a specific visual language.
- Still render with a usable default look when paired with a reference theme.

## Expected consumer workflow

1. Define palette (`refs`) and map it to semantic roles (`sys`).
2. Optionally apply a reference theme for quick setup.
3. Override per-component vars when deeper customization is required.

## Non-goals

- Runtime theming is not a priority.
- CSS-only overrides are not a primary target.
- Seedly should not encode a full external design spec in its system contract.

## Summary

Seedly stays in the middle by:

- Keeping system roles **semantic and minimal**.
- Exposing **component-level contracts** as the main styling surface.
- Allowing **optional presets** for convenience without locking consumers in.
