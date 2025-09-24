import { anchorFields, backgroundTintField } from '../shared';

import type { Block } from 'payload';

export const contacts: Block = {
  slug: 'contacts',
  labels: {
    singular: 'Contacts section',
    plural: 'Contacts sections',
  },
  fields: [
    ...anchorFields,
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      ...backgroundTintField,
      defaultValue: 'primary',
    },
    {
      name: 'information',
      type: 'richText',
    },
    {
      name: 'formType',
      type: 'select',
      defaultValue: 'message',
      options: [
        { label: 'Message', value: 'message' },
        { label: 'Inscription', value: 'inscription' },
      ],
    },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form fields',
      fields: [
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text field', value: 'textField' },
            { label: 'Select', value: 'select' },
            { label: 'Textarea', value: 'textarea' },
          ],
          defaultValue: 'textField',
        },
        {
          name: 'fieldName',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
        },
        {
          name: 'optionsSource',
          type: 'relationship',
          relationTo: 'courseSessions',
          admin: {
            condition: (_value: unknown, siblingData: { fieldType?: string }) =>
              siblingData.fieldType === 'select',
            description:
              'Select a session list to populate the dropdown options.',
          },
        },
      ],
    },
    {
      name: 'showMap',
      type: 'checkbox',
      label: 'Display map',
      defaultValue: true,
    },
    {
      name: 'location',
      type: 'point',
      admin: {
        condition: (_value: unknown, siblingData: { showMap?: boolean }) =>
          Boolean(siblingData.showMap),
      },
    },
  ],
};
