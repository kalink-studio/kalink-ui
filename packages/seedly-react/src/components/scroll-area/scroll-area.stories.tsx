import * as styles from '@kalink-ui/seedly/components/scroll-area';

import { ScrollArea } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Scroll Area',
  component: ScrollArea.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea.Root>;

export default meta;

type Story = StoryObj<typeof ScrollArea.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p className={styles.paragraph}>
            Vernacular architecture is building done outside any academic
            tradition, and without professional guidance. It is not a particular
            architectural movement or style, but rather a broad category,
            encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both
            historical and extant and classical and modern. Vernacular
            architecture constitutes 95% of the world&apos;s built environment,
            estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and
            built by engineers.
          </p>
          <p className={styles.paragraph}>
            This type of architecture usually serves immediate, local needs, is
            constrained by the materials available in its particular region and
            reflects local traditions and cultural practices. The study of
            vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of
            local builders, who were rarely given any attribution for the work.
            More recently, vernacular architecture has been examined by
            designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a
            broader interest in sustainable design.
          </p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
