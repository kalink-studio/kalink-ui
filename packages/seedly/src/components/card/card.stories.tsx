import { FunctionComponent } from 'react';

import { responsiveSelectArg } from '../../utils';
import { Button } from '../button';
import { Heading } from '../heading';
import { Text } from '../text';

import { Card } from './card';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/Card',
  component: Card,
  subcomponents: {
    'Card.Header': Card.Header as FunctionComponent<unknown>,
    'Card.Body': Card.Body as FunctionComponent<unknown>,
    'Card.Footer': Card.Footer as FunctionComponent<unknown>,
  },
  tags: ['autodocs'],
  argTypes: {
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Heading variant="display" size="small">
          Consequat sint exercitation nisi
        </Heading>
      </Card.Header>
      <Card.Body>
        <Text use="p" variant="body" size="medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          quia.
        </Text>
      </Card.Body>
    </Card>
  ),
};

export const WithPretitle: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Heading
          variant="display"
          size="small"
          pretitle={
            <Heading.Pretitle spacing={2}>
              Incididunt proident laborum elit
            </Heading.Pretitle>
          }
        >
          Consequat sint exercitation nisi
        </Heading>
      </Card.Header>
      <Card.Body>
        <Text use="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          quia.
        </Text>
      </Card.Body>
    </Card>
  ),
};

export const WithSubtitle: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Heading
          variant="display"
          size="small"
          subtitle={
            <Heading.Subtitle spacing={2}>
              Incididunt proident laborum elit
            </Heading.Subtitle>
          }
        >
          Consequat sint exercitation nisi
        </Heading>
      </Card.Header>
      <Card.Body>
        <Text use="p" variant="body" size="medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          quia.
        </Text>
      </Card.Body>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Heading variant="display" size="small">
          Consequat sint exercitation nisi
        </Heading>
      </Card.Header>
      <Card.Body>
        <Text use="p" variant="body" size="medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          quia.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="plain">Action</Button>
      </Card.Footer>
    </Card>
  ),
};
