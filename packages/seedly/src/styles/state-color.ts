import { sys } from './system-contract.css';

export const stateColor = {
  mutedContent: `color-mix(in srgb, ${sys.color.content.base} calc(100% * ${sys.state.muted.text}), transparent)`,
  disabledContent: `color-mix(in srgb, ${sys.color.content.base} calc(100% * ${sys.state.disabled.text}), transparent)`,
  subtleContent: `color-mix(in srgb, ${sys.color.content.base} calc(100% * ${sys.state.disabled.border}), transparent)`,
} as const;
