# Tone system (internal)

This document defines the **tone system** for Seedly's semantic color
architecture. It is intended for internal implementation guidance and will later
be adapted for external documentation.

## Overview

Seedly separates colors into two distinct concerns:

1. **Surface colors** (`sys.color.surface`) — The page-level canvas
2. **Tone colors** (`sys.color.tone`) — Semantic colors for interactive and stateful
   elements

Surface expresses the neutral canvas of the application, so components can
anchor their defaults against a consistent base layer before applying tones for
emphasis.

This separation exists because a neutral interactive element sitting on a page
is visually distinct from the page background itself. Keeping them separate
gives consumers full control over both layers.

## Surface and container colors

Surface and container colors define the neutral UI layers:

| Token                      | Purpose                           |
| -------------------------- | --------------------------------- |
| `sys.color.surface.dim`    | Dimmed page or app background     |
| `sys.color.surface.base`   | Default page or app background    |
| `sys.color.surface.bright` | Brightened page or app background |
| `sys.color.container.low`  | Subtle component shell            |
| `sys.color.container.base` | Default component shell           |
| `sys.color.container.high` | Elevated component shell          |
| `sys.color.container.top`  | Highest emphasis component shell  |
| `sys.color.content.base`   | Default neutral text/icon color   |

Surface is the global canvas; containers are component shells. Content is the
default neutral ink used across both.

## Tone colors

Tones are semantic color pairs for interactive elements and stateful feedback.
Each tone consists of two tokens following the `on{Name}` convention:

| Pattern                   | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `sys.color.tone.{name}`   | The tone's base color (container/surface)  |
| `sys.color.tone.on{Name}` | The contrasting color (content/text on it) |

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
axis controls visual treatment (`solid`, `outline`, `bare`). These are orthogonal
concerns.

### Variant and tone interaction

The `variant` controls how tones are applied:

| Variant   | Container               | Content                   | Outline                 |
| --------- | ----------------------- | ------------------------- | ----------------------- |
| `solid`   | `sys.color.tone.{tone}` | `sys.color.tone.on{Tone}` | `transparent`           |
| `outline` | `transparent`           | `sys.color.tone.{tone}`   | `sys.color.tone.{tone}` |
| `bare`    | `transparent`           | `sys.color.tone.{tone}`   | `transparent`           |

When `tone` is omitted, components use neutral roles instead of tone roles:

- `solid` uses `sys.color.surface.*` or `sys.color.container.*`
- `outline` derives its outline from the active surface/container color
- `bare` uses `sys.color.content.base`

Component vars (e.g. `buttonVars.color.outline`) map to tone tokens when a tone
is active, but can be overridden independently at the component level.

### State modifiers

Tones rely on global state tokens for hover, pressed, and disabled styling:

- `sys.state.hovered.opacity`
- `sys.state.pressed.opacity`
- `sys.state.muted.text`
- `sys.state.muted.surface`

Disabled states should reduce contrast using the muted tokens, regardless of the
active tone.

### Form field error states

Form components use the `destructive` tone for error states and the `success`
tone for valid states. This is applied via data attributes or internal state,
not as a variant.

## Design decisions

### Why not expand `sys.color.surface` with semantic slots?

The theming strategy states that Seedly should not encode a full external design
spec in its system contract. Adding `primary`, `destructive`, etc. directly to
`sys.color.surface` would mix surface concerns with interactive semantics. The
`sys.color.tone` namespace keeps them organized and purpose-clear.

### Why flat tokens instead of nested?

Flat structure (`sys.color.tone.primary`, `sys.color.tone.onPrimary`) instead of
nested (`sys.color.tone.primary.base`, `sys.color.tone.primary.onBase`) because:

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

- `sys.color.surface` defines page-level surface roles (dim/base/bright)
- `sys.color.container` defines component shells (low/base/high/top)
- `sys.color.content.base` is neutral ink
- `sys.color.tone` defines semantic interactive colors
- Components expose `tone` as a variant axis alongside `variant` and `size`
- Tones use flat pairs: `{tone}` and `on{Tone}`
