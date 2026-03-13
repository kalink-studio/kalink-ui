import { expect, userEvent, within } from 'storybook/test';

import { Text } from '../text';

import { Accordion } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

const meta = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion.Root>;

export default meta;

type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /what is base ui\?/i,
    });
    await userEvent.click(trigger);

    const content = await within(canvasElement.ownerDocument.body).findByText(
      /Base UI is a library of high-quality unstyled React components/i,
    );

    await expect(content).toBeVisible();
  },
};

function Example() {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            What is Base UI?
            <Accordion.TriggerIcon render={<PlusIcon />} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Accordion.Content>
            <Text>
              Base UI is a library of high-quality unstyled React components for
              design systems and web apps.
            </Text>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            How do I get started?
            <Accordion.TriggerIcon render={<PlusIcon />} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Accordion.Content>
            <Text>
              Head to the “Quick start” guide in the docs. If you’ve used
              unstyled libraries before, you’ll feel at home.
            </Text>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            Can I use it for my project?
            <Accordion.TriggerIcon render={<PlusIcon />} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Accordion.Content>
            <Text>Of course! Base UI is free and open source.</Text>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function PlusIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}
