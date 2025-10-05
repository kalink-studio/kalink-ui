import type { SendFormData } from '@/app/(frontend)/actions/send-form';

export const renderMessage = ({ name, email, message }: SendFormData) => (
  <div>
    <h3>Nouveau message envoyé depuis Kalink Studio</h3>
    <ul>
      <li>
        <strong>Nom:</strong> {name}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
    </ul>
    <h3 style={{ marginTop: '32px' }}>Message</h3>
    <p>{message}</p>
  </div>
);
