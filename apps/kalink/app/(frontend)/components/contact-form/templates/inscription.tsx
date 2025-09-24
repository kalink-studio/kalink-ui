import type { SendFormData } from '@/app/(frontend)/actions/send-form';

export const renderInscription = ({
  name,
  email,
  phone,
  session,
  comments,
}: SendFormData) => (
  <div>
    <h3>Nouvelle inscription à un cours sur Kalink Studio</h3>
    <ul>
      <li>
        <strong>Nom:</strong> {name}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
      {phone ? (
        <li>
          <strong>Téléphone:</strong> {phone}
        </li>
      ) : null}
      {session ? (
        <li>
          <strong>Session sélectionnée:</strong> {session}
        </li>
      ) : null}
    </ul>
    {comments ? (
      <>
        <h3 style={{ marginTop: '32px' }}>Commentaire</h3>
        <p>{comments}</p>
      </>
    ) : null}
  </div>
);
