import { Meta, StoryObj } from '@storybook/react-vite';

import { responsiveSelectArg } from '../../utils';
import { Box } from '../box';
import { Button } from '../button';
import { Card } from '../card';
import { Heading } from '../heading';
import { Stack } from '../stack';
import { Text } from '../text';

import { Skeleton } from './skeleton';

const meta = {
  title: 'Component/Skeleton',
  component: Skeleton,
  argTypes: {
    size: responsiveSelectArg({
      options: ['sm', 'md', 'lg'],
      summary: 'Responsive<SkeletonSize>',
    }),
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    radius: 'circle',
    type: 'block',
  },
  render: (args) => (
    <Box spacing={2}>
      <Skeleton {...args} />
    </Box>
  ),
};

export const WithChildren: Story = {
  args: {
    children: <Text>Nostrud in cillum dolor sunt pariatur.</Text>,
  },
};

export const LoadingCard: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Stack spacing={2}>
          <Skeleton>
            <Heading
              variant="headline"
              subtitle={
                <Heading.Subtitle>
                  Culpa est duis consectetur deserunt consequat.
                </Heading.Subtitle>
              }
            >
              Eiusmod sit laboris minim pariatur
            </Heading>
          </Skeleton>
          <Skeleton>
            <Button>Irure velit</Button>
          </Skeleton>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Stack spacing={2} align="stretch">
          <Skeleton type="paragraph" />
          <Skeleton />
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Skeleton>
          <Button>Laborum</Button>
        </Skeleton>
        <Skeleton>
          <Button>Mollit</Button>
        </Skeleton>
      </Card.Footer>
    </Card>
  ),
};
