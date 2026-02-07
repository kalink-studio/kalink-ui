import { AlertDialog } from '@base-ui/react/alert-dialog';
import * as styles from '@kalink-ui/seedly/components/alert-dialog';

export default function ExampleAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger data-color="red" className={styles.Button}>
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={styles.Backdrop} />
        <AlertDialog.Popup className={styles.Popup}>
          <AlertDialog.Title className={styles.Title}>
            Discard draft?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            You can&apos;t undo this action.
          </AlertDialog.Description>
          <div className={styles.Actions}>
            <AlertDialog.Close className={styles.Button}>
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close data-color="red" className={styles.Button}>
              Discard
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
