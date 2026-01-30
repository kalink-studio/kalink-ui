interface ResponsiveArgConfig {
  options: string[];
  description?: string;
  category?: string;
  control?: 'select' | 'radio';
  summary?: string;
}

const defaultDescription =
  'Supports responsive values (object or array). Use story args for breakpoints.';

export function responsiveSelectArg({
  options,
  description = defaultDescription,
  category,
  control = 'select',
  summary,
}: ResponsiveArgConfig) {
  return {
    control,
    options,
    description,
    table: {
      ...(category ? { category } : {}),
      ...(summary ? { type: { summary } } : {}),
    },
  };
}
