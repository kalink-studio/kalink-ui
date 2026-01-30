# Tone system (internal)

This document defines the **tone system** for Seedly's semantic color
architecture. It is intended for internal implementation guidance and will later
be adapted for external documentation.

## Overview

Seedly separates colors into two distinct concerns:

1. **Surface colors** (`sys.surface`) — The page-level canvas
2. **Tone colors** (`sys.tone`) — Semantic colors for interactive and stateful
   elements

Surface expresses the neutral canvas of the application, so components can
anchor their defaults against a consistent base layer before applying tones for
emphasis.

This separation exists because a neutral interactive element sitting on a page
is visually distinct from the page background itself. Keeping them separate
gives consumers full control over both layers.

## Surface colors

Surface colors define the default page/app appearance:

| Token                    | Purpose                          |
| ------------------------ | -------------------------------- |
| `sys.surface.background` | Page or app background           |
| `sys.surface.foreground` | Default text color on background |

These tokens are the canvas on which components are rendered. They can also
serve as a neutral foundation for components that should blend with the base
surface before tones are applied.

## Tone colors

Tones are semantic color pairs for interactive elements and stateful feedback.
Each tone consists of two tokens following the `on{Name}` convention:

| Pattern             | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `sys.tone.{name}`   | The tone's base color (container/surface)  |
| `sys.tone.on{Name}` | The contrasting color (content/text on it) |

### Defined tones

| Tone          | Purpose                                        |
| ------------- | ---------------------------------------------- |
| `neutral`     | Default interactive elements without emphasis  |
| `primary`     | Brand emphasis, main calls-to-action           |
| `destructive` | Errors, dangerous/irreversible actions         |
| `success`     | Positive feedback, confirmations, valid states |

## Why separate surface from tones?

A neutral button needs to stand out from the page surface. If they shared the
same token, you could not style a neutral button differently from the page
background.

Keeping them separate allows:

- Neutral elements to be visually distinct from the surface
- Surface to change independently of component tones
- Consumers to alias them if their design requires it

## Component integration

Components use `tone` as a variant axis to apply semantic colors. The `variant`
axis controls visual treatment (filled, outlined, text). These are orthogonal
concerns.

### Variant and tone interaction

The `variant` controls how tones are applied:

| Variant    | Container         | Content             | Outline           |
| ---------- | ----------------- | ------------------- | ----------------- |
| `filled`   | `sys.tone.{tone}` | `sys.tone.on{Tone}` | `transparent`     |
| `outlined` | `transparent`     | `sys.tone.{tone}`   | `sys.tone.{tone}` |
| `text`     | `transparent`     | `sys.tone.{tone}`   | `transparent`     |

Component vars (e.g. `buttonVars.color.outline`) map to tone tokens when a tone
is active, but can be overridden independently at the component level.

### State modifiers

Tones rely on global state tokens for hover, pressed, and disabled styling:

- `sys.state.hovered.opacity`
- `sys.state.pressed.opacity`
- `sys.state.muted.light`
- `sys.state.muted.dark`

Disabled states should reduce contrast using the muted tokens, regardless of the
active tone.

### Form field error states

Form components use the `destructive` tone for error states and the `success`
tone for valid states. This is applied via data attributes or internal state,
not as a variant.

## Design decisions

### Why not expand `sys.surface` with semantic slots?

The theming strategy states that Seedly should not encode a full external design
spec in its system contract. Adding `primary`, `destructive`, etc. directly to
`sys.surface` would mix surface concerns with interactive semantics. The
`sys.tone` namespace keeps them organized and purpose-clear.

### Why flat tokens instead of nested?

Flat structure (`sys.tone.primary`, `sys.tone.onPrimary`) instead of nested
(`sys.tone.primary.base`, `sys.tone.primary.onBase`) because:

- Shorter paths in component code
- Matches established design system conventions
- Simpler mental model

### Why these four tones?

| Tone          | Justification                                      |
| ------------- | -------------------------------------------------- |
| `neutral`     | Every design system needs a default                |
| `primary`     | Brand emphasis is universal                        |
| `destructive` | Error states and dangerous actions are unavoidable |
| `success`     | Form validation requires both error and success    |

Additional tones can be added later if needed, but these four cover the
essential use cases without over-specifying a design language.

## Summary

- `sys.surface` defines the page-level surface (background/foreground)
- `sys.tone` defines semantic interactive colors
- Components expose `tone` as a variant axis alongside `variant` and `size`
- Tones use flat pairs: `{tone}` and `on{Tone}`
