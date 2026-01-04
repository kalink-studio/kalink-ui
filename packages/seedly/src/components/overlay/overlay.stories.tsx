import { overlay } from './overlay.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Internal/Overlay',
  tags: ['internal'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Open: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 300, background: '#f0f0f0' }}>
      <div style={{ padding: 20 }}>
        <h2>Background Content</h2>
        <p>This content is behind the overlay.</p>
      </div>
      <div className={overlay} data-state="open" />
    </div>
  ),
};

export const Closed: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 300, background: '#f0f0f0' }}>
      <div style={{ padding: 20 }}>
        <h2>Background Content</h2>
        <p>
          This content is behind the overlay (closed state - animating out).
        </p>
      </div>
      <div className={overlay} data-state="closed" />
    </div>
  ),
};
