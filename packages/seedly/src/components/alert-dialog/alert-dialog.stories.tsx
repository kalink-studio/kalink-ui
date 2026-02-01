import { argTypesFromRecipe, responsiveSelectArg } from '../../utils';
import { Button } from '../button';
import { Stack } from '../stack';

import { AlertDialog } from './alert-dialog';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import {
  AlertDialogContent,
  AlertDialogContentProps,
} from './alert-dialog-content';
import { alertDialogContentRecipe } from './alert-dialog-content.css';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogFooter } from './alert-dialog-footer';
import { AlertDialogHeader } from './alert-dialog-header';
import { AlertDialogTitle } from './alert-dialog-title';
import { AlertDialogTrigger } from './alert-dialog-trigger';

import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = AlertDialogContentProps;

const meta = {
  title: 'Component/AlertDialog',
  component: AlertDialogContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    radius: 'small',
  },
  argTypes: {
    ...argTypesFromRecipe(alertDialogContentRecipe),
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="plain">Open</Button>
      </AlertDialogTrigger>
      <AlertDialogContent {...args}>
        <Stack spacing={4} align="stretch">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter spacing={2}>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="plain">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </Stack>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
