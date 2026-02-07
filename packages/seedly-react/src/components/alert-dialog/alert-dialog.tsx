import { AlertDialog } from '@base-ui/react/alert-dialog';
import * as styles from '@kalink-ui/seedly/components/alert-dialog';

export default function ExampleAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger data-color="red" className={styles.button}>
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={styles.backdrop} />
        <AlertDialog.Popup className={styles.popup}>
          <AlertDialog.Title className={styles.title}>
            Discard draft?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.description}>
            You can&apos;t undo this action.
          </AlertDialog.Description>
          <div className={styles.actions}>
            <AlertDialog.Close className={styles.button}>
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close data-color="red" className={styles.button}>
              Discard
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
