'use server';

import { Resend } from 'resend';

import { renderInscription } from '@/app/(frontend)/components/contact-form/templates/inscription';
import { renderMessage } from '@/app/(frontend)/components/contact-form/templates/message';

export interface SendFormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

export async function sendForm(
  formData: SendFormData,
  type: 'message' | 'inscription',
) {
  const resendKey = process.env.RESEND_KEY;

  if (!resendKey) {
    throw new Error('RESEND_KEY is not configured');
  }

  const resend = new Resend(resendKey);

  const subjectPrefix =
    type === 'message'
      ? 'Message depuis Kalink Studio'
      : 'Inscription depuis Kalink Studio';

  return resend.emails.send({
    from: 'info@kalink.ch',
    to: 'info@kalink.ch',
    subject: subjectPrefix,
    react:
      type === 'message'
        ? renderMessage(formData)
        : renderInscription(formData),
  });
}
