type ResponsiveControlType = 'inline-radio' | 'radio' | 'select';

export interface StorybookArgType {
  control?: {
    type: ResponsiveControlType;
    labels?: Record<string, string>;
  };
  description?: string;
  options?: readonly string[];
  table?: {
    type?: {
      summary?: string;
      detail?: string;
    };
  };
}

interface ResponsiveVariantArgTypeArgs {
  control?: ResponsiveControlType;
  description?: string;
  summary?: string;
  detail?: string;
  labels?: Record<string, string>;
}

type RecipeVariantClassNames = Record<string, string>;

export function responsiveVariantArgType<TOption extends string>(
  options: readonly TOption[],
  args: ResponsiveVariantArgTypeArgs = {},
): StorybookArgType {
  const optionValues = [...options];
  const union = toTypeUnion(optionValues);
  const controlType = args.control ?? defaultControlType(optionValues);

  return {
    control: args.labels
      ? {
          type: controlType,
          labels: args.labels,
        }
      : {
          type: controlType,
        },
    description: args.description,
    options: optionValues,
    table: {
      type: {
        summary: args.summary ?? `Responsive<${union}>`,
        detail: args.detail ?? defaultResponsiveDetail(union),
      },
    },
  };
}

export function responsiveVariantArgTypeFromClassNames<
  const TVariantClassNames extends RecipeVariantClassNames,
>(
  variantClassNames: TVariantClassNames,
  args: ResponsiveVariantArgTypeArgs = {},
): StorybookArgType {
  const options = Object.keys(variantClassNames) as Extract<
    keyof TVariantClassNames,
    string
  >[];

  return responsiveVariantArgType(options, args);
}

function defaultControlType(options: readonly string[]): ResponsiveControlType {
  if (options.length <= 4) {
    return 'radio';
  }

  return 'select';
}

function toTypeUnion(options: readonly string[]): string {
  if (options.length === 0) {
    return 'never';
  }

  return options.map((option) => `'${option}'`).join(' | ');
}

function defaultResponsiveDetail(union: string): string {
  return `${union} | { xs?: ${union}; sm?: ${union}; md?: ${union}; lg?: ${union}; xl?: ${union}; '2xl'?: ${union}; '3xl'?: ${union} } | (${union} | null | undefined)[]`;
}
