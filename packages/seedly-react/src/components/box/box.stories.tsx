import { Box as SeedlyBox } from '.';

import type { BoxProps } from './box';
import type { Meta, StoryObj } from '@storybook/react-vite';

const toneColorKeyOptions = [
  'neutral',
  'primary',
  'secondary',
  'tertiary',
  'error',
] as const;
const containerColorKeyOptions = ['low', 'base', 'high', 'top'] as const;
const surfaceColorKeyOptions = ['dim', 'base', 'bright'] as const;
const variantOptions = ['solid', 'outline', 'bare'] as const;
const spacingOptions = [0, 2, 4, 6, 8, 10, 12] as const;
const cornerOptions = ['none', 'sharp', 'small', 'medium', 'rounded'] as const;
const elevationOptions = [
  'none',
  'minimal',
  'low',
  'moderate',
  'high',
] as const;

interface BoxControlArgs {
  children?: string;
  colorSource?: 'tone' | 'container' | 'surface';
  toneColorKey?: (typeof toneColorKeyOptions)[number];
  containerColorKey?: (typeof containerColorKeyOptions)[number];
  surfaceColorKey?: (typeof surfaceColorKeyOptions)[number];
  variant?: NonNullable<BoxProps['variant']>;
  spacing?: NonNullable<BoxProps['spacing']>;
  corner?: NonNullable<BoxProps['corner']>;
  elevation?: NonNullable<BoxProps['elevation']>;
}

const meta = {
  title: 'Layout/Box',
  component: SeedlyBox as unknown as Meta<BoxControlArgs>['component'],
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    children: 'Team updates',
    variant: 'solid',
    colorSource: 'tone',
    toneColorKey: 'primary',
    containerColorKey: 'high',
    surfaceColorKey: 'dim',
    spacing: 8,
    corner: 'medium',
    elevation: 'none',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
      },
      options: variantOptions,
    },
    colorSource: {
      control: {
        type: 'inline-radio',
      },
      options: ['tone', 'container', 'surface'],
    },
    toneColorKey: {
      control: {
        type: 'select',
      },
      options: toneColorKeyOptions,
      if: { arg: 'colorSource', eq: 'tone' },
    },
    containerColorKey: {
      control: {
        type: 'select',
      },
      options: containerColorKeyOptions,
      if: { arg: 'colorSource', eq: 'container' },
    },
    surfaceColorKey: {
      control: {
        type: 'select',
      },
      options: surfaceColorKeyOptions,
      if: { arg: 'colorSource', eq: 'surface' },
    },
    spacing: {
      control: {
        type: 'select',
      },
      options: spacingOptions,
    },
    corner: {
      control: {
        type: 'select',
      },
      options: cornerOptions,
    },
    elevation: {
      control: {
        type: 'select',
      },
      options: elevationOptions,
    },
  },
} satisfies Meta<BoxControlArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => renderBox(args),
};

export const Tone: Story = {
  args: {
    children: 'Tone source',
    colorSource: 'tone',
    toneColorKey: 'primary',
    variant: 'outline',
    spacing: 6,
    corner: 'medium',
    elevation: 'none',
  },
  render: (args) => renderBox(args),
};

export const LayoutOnly: Story = {
  args: {
    children: 'Layout only',
    colorSource: undefined,
    variant: undefined,
    spacing: 6,
    corner: 'medium',
    elevation: 'minimal',
  },
  render: (args) => renderBox(args),
};

export const Container: Story = {
  args: {
    children: 'Container source',
    colorSource: 'container',
    containerColorKey: 'high',
    variant: 'solid',
    spacing: 6,
    corner: 'medium',
    elevation: 'none',
  },
  render: (args) => renderBox(args),
};

export const Surface: Story = {
  args: {
    children: 'Surface source',
    colorSource: 'surface',
    surfaceColorKey: 'dim',
    variant: 'outline',
    spacing: 6,
    corner: 'medium',
    elevation: 'none',
  },
  render: (args) => renderBox(args),
};

function renderBox(args: BoxControlArgs) {
  const {
    children = 'Team updates',
    colorSource,
    toneColorKey = 'primary',
    containerColorKey = 'high',
    surfaceColorKey = 'dim',
    variant,
    spacing = 6,
    corner = 'medium',
    elevation = 'none',
  } = args;

  if (colorSource === 'tone') {
    return (
      <SeedlyBox
        colorSource="tone"
        colorKey={toneColorKey}
        variant={variant}
        spacing={spacing}
        corner={corner}
        elevation={elevation}
      >
        {children}
      </SeedlyBox>
    );
  }

  if (colorSource === 'container') {
    return (
      <SeedlyBox
        colorSource="container"
        colorKey={containerColorKey}
        variant={variant}
        spacing={spacing}
        corner={corner}
        elevation={elevation}
      >
        {children}
      </SeedlyBox>
    );
  }

  if (colorSource === 'surface') {
    return (
      <SeedlyBox
        colorSource="surface"
        colorKey={surfaceColorKey}
        variant={variant}
        spacing={spacing}
        corner={corner}
        elevation={elevation}
      >
        {children}
      </SeedlyBox>
    );
  }

  return (
    <SeedlyBox spacing={spacing} corner={corner} elevation={elevation}>
      {children}
    </SeedlyBox>
  );
}
