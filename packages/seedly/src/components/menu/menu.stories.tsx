import { responsiveSelectArg } from '../../utils';

import { menuItemRecipe, menuItemIcon } from './menu-item.css';
import { menuSeparatorRecipe } from './menu-separator.css';

import type { Tone } from '../../styles';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface StoryArgs {
  tone?: Tone;
}

const meta: Meta<StoryArgs> = {
  title: 'Internal/Menu',
  tags: ['internal'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const MenuItem: Story = {
  render: ({ tone }) => (
    <div style={{ width: 200 }}>
      <div className={menuItemRecipe({ tone })}>Default Item</div>
      <div className={menuItemRecipe({ inset: true, tone })}>Inset Item</div>
      <div className={menuItemRecipe({ tone })} data-disabled="true">
        Disabled Item
      </div>
      <div className={menuItemRecipe({ tone })}>Selected Item</div>
    </div>
  ),
};

export const MenuItemWithIcon: Story = {
  render: ({ tone }) => (
    <div style={{ width: 200 }}>
      <div className={menuItemRecipe({ tone })}>
        <svg
          className={menuItemIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
      </div>
      <div className={menuItemRecipe({ tone })}>
        <svg
          className={menuItemIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Settings
      </div>
    </div>
  ),
};

export const MenuSeparator: Story = {
  render: ({ tone }) => (
    <div style={{ width: 200 }}>
      <div className={menuItemRecipe({ tone })}>Item 1</div>
      <div className={menuItemRecipe({ tone })}>Item 2</div>
      <div className={menuSeparatorRecipe({ spacing: 2 })} />
      <div className={menuItemRecipe({ tone })}>Item 3</div>
      <div className={menuItemRecipe({ tone })}>Item 4</div>
    </div>
  ),
};

export const MenuSeparatorOffset: Story = {
  render: ({ tone }) => (
    <div
      style={{
        width: 200,
        padding: 8,
        background: 'var(--sys-color-background)',
      }}
    >
      <div className={menuItemRecipe({ tone })}>Item 1</div>
      <div className={menuSeparatorRecipe({ offset: true, spacing: 2 })} />
      <div className={menuItemRecipe({ tone })}>Item 2</div>
    </div>
  ),
};
