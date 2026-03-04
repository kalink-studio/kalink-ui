import { expect, userEvent, within } from 'storybook/test';

import { Autocomplete } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete.Root>;

export default meta;

type Story = StoryObj<typeof Autocomplete.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/search tags/i);

    await userEvent.type(input, 'feat');

    const body = within(canvasElement.ownerDocument.body);
    const option = await body.findByRole('option', { name: 'feature' });
    await userEvent.click(option);

    await expect(input).toHaveValue('feature');
  },
};

function Example() {
  return (
    <Autocomplete.Root items={tags}>
      <Autocomplete.Label>
        Search tags
        <Autocomplete.Input placeholder="e.g. feature" />
      </Autocomplete.Label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={4}>
          <Autocomplete.Popup>
            <Autocomplete.Empty>No tags found.</Autocomplete.Empty>
            <Autocomplete.List>
              {(tag: Tag) => (
                <Autocomplete.Item key={tag.id} value={tag}>
                  {tag.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-checkbox-group', value: 'component: checkbox group' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-context-menu', value: 'component: context menu' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-field', value: 'component: field' },
  { id: 'c-fieldset', value: 'component: fieldset' },
  { id: 'c-filterable-menu', value: 'component: filterable menu' },
  { id: 'c-form', value: 'component: form' },
  { id: 'c-input', value: 'component: input' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-menubar', value: 'component: menubar' },
  { id: 'c-meter', value: 'component: meter' },
  { id: 'c-navigation-menu', value: 'component: navigation menu' },
  { id: 'c-number-field', value: 'component: number field' },
  { id: 'c-popover', value: 'component: popover' },
  { id: 'c-preview-card', value: 'component: preview card' },
  { id: 'c-progress', value: 'component: progress' },
  { id: 'c-radio', value: 'component: radio' },
  { id: 'c-scroll-area', value: 'component: scroll area' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-separator', value: 'component: separator' },
  { id: 'c-slider', value: 'component: slider' },
  { id: 'c-switch', value: 'component: switch' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-toggle', value: 'component: toggle' },
  { id: 'c-toggle-group', value: 'component: toggle group' },
  { id: 'c-toolbar', value: 'component: toolbar' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];
