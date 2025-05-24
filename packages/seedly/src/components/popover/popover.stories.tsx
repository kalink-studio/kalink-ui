import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CommonArgs, commonArgs } from '../../utils';
import { Button } from '../button';
import { Heading } from '../heading';
import { Stack } from '../stack';
import { Text } from '../text';

import { Popover, PopoverTrigger } from './popover';
import { PopoverContent } from './popover-content';

const meta = {
  title: 'Component/Popover',
  parameters: {
    layout: 'centered',
  },
  component: Popover,
  args: {},
  argTypes: {
    ...commonArgs([CommonArgs.COMPOSABLE, CommonArgs.STYLABLE]),
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PopoverStory />,
};

const PopoverStory = () => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>{'Open'}</Button>
        </PopoverTrigger>
        <PopoverContent container={portalRoot} radius="medium" color="surface">
          <Stack>
            <Heading variant="title" size="small">
              Nulla irure dolore occaecat aute deserunt Lorem occaecat commodo
              duis minim consequat fugiat.
            </Heading>
            <Text>
              Esse magna occaecat fugiat ipsum eiusmod est aliqua labore.
              Laboris fugiat Lorem occaecat eu sunt irure eiusmod commodo.
              Excepteur Lorem est est exercitation elit ullamco proident
              laboris. Commodo excepteur exercitation incididunt adipisicing
              exercitation aute ex voluptate in. Laborum irure sint est
              excepteur occaecat irure eiusmod consectetur adipisicing commodo
              nostrud occaecat. Magna cillum ipsum nisi excepteur veniam laboris
              pariatur et aliqua deserunt dolore mollit enim magna. Laboris
              pariatur culpa nostrud et ipsum consequat ea pariatur mollit quis
              commodo commodo eiusmod laboris. Non exercitation qui amet. Velit
              occaecat aute cillum in qui exercitation esse incididunt. Anim
              aliqua voluptate nulla qui mollit nisi cillum minim irure mollit
              velit nisi irure sint. Ut cillum ea id excepteur veniam id
              voluptate excepteur pariatur quis nostrud eiusmod.
            </Text>
          </Stack>
        </PopoverContent>
      </Popover>

      <div ref={setPortalRoot} id="portal-root"></div>
    </>
  );
};
