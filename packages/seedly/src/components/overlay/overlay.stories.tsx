import { responsiveSelectArg } from '../../utils';

import { overlayRecipe } from './overlay.css';

import type { Tone } from '../../styles';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface StoryArgs {
  tone?: Tone;
}

const meta: Meta<StoryArgs> = {
  title: 'Internal/Overlay',
  tags: ['internal'],
  parameters: {
    layout: 'fullscreen',
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

export const Open: Story = {
  render: ({ tone }) => (
    <div style={{ position: 'relative', height: 300, background: '#f0f0f0' }}>
      <div style={{ padding: 20 }}>
        <h2>Background Content</h2>
        <p>This content is behind the overlay.</p>
      </div>
      <div className={overlayRecipe({ tone })} data-state="open" />
    </div>
  ),
};

export const Closed: Story = {
  render: ({ tone }) => (
    <div style={{ position: 'relative', height: 300, background: '#f0f0f0' }}>
      <div style={{ padding: 20 }}>
        <h2>Background Content</h2>
        <p>
          This content is behind the overlay (closed state - animating out).
        </p>
      </div>
      <div className={overlayRecipe({ tone })} data-state="closed" />
    </div>
  ),
};
