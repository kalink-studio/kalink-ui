import { Toast } from '@base-ui/react/toast';
import * as styles from '@kalink-ui/seedly/components/toast';
import * as React from 'react';

import { Toast as SeedlyToast } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Toast',
  component: SeedlyToast.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyToast.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyToast.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Toast.Provider>
      <ToastCreateButton />
      <Toast.Portal>
        <Toast.Viewport className={styles.viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastCreateButton() {
  const toastManager = Toast.useToastManager();
  const [count, setCount] = React.useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: `Toast ${count + 1} created`,
      description: 'This is a toast notification.',
    });
  }

  return (
    <button type="button" className={styles.button} onClick={createToast}>
      Create toast
    </button>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.toast}>
      <Toast.Content className={styles.content}>
        <Toast.Title className={styles.title} />
        <Toast.Description className={styles.description} />
        <Toast.Close className={styles.close} aria-label="Close">
          <XIcon className={styles.icon} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

function XIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
