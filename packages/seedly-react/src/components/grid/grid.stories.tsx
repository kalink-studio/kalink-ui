import { Grid as SeedlyGrid, GridChild as SeedlyGridChild } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Grid',
  component: SeedlyGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyGrid>;

export default meta;

type Story = StoryObj<typeof SeedlyGrid>;

export const FixedColumns: Story = {
  render: () => <FixedColumnsExample />,
};

export const AutoLayout: Story = {
  render: () => <AutoLayoutExample />,
};

function FixedColumnsExample() {
  return (
    <SeedlyGrid columns={{ xs: 2, md: 4 }} spacing={{ xs: 3, md: 5 }}>
      <SeedlyGridChild colSpan={{ xs: 2, md: 2 }}>
        <Card>Hero</Card>
      </SeedlyGridChild>
      <SeedlyGridChild>
        <Card>A</Card>
      </SeedlyGridChild>
      <SeedlyGridChild>
        <Card>B</Card>
      </SeedlyGridChild>
      <SeedlyGridChild>
        <Card>C</Card>
      </SeedlyGridChild>
      <SeedlyGridChild>
        <Card>D</Card>
      </SeedlyGridChild>
    </SeedlyGrid>
  );
}

function AutoLayoutExample() {
  return (
    <SeedlyGrid minSize="10rem" autoLayout="fit" spacing={4}>
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
      <Card>Card 4</Card>
      <Card>Card 5</Card>
      <Card>Card 6</Card>
    </SeedlyGrid>
  );
}

function Card({ children }: { children: string }) {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}
