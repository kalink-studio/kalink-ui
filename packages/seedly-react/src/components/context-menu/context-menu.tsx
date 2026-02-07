import { ContextMenu } from '@base-ui/react/context-menu';
import * as styles from '@kalink-ui/seedly/components/context-menu';

export default function ExampleMenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={styles.trigger}>
        Right click here
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner className={styles.positioner}>
          <ContextMenu.Popup className={styles.popup}>
            <ContextMenu.Item className={styles.item}>
              Add to Library
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.item}>
              Add to Playlist
            </ContextMenu.Item>
            <ContextMenu.Separator className={styles.separator} />
            <ContextMenu.Item className={styles.item}>
              Play Next
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.item}>
              Play Last
            </ContextMenu.Item>
            <ContextMenu.Separator className={styles.separator} />
            <ContextMenu.Item className={styles.item}>
              Favorite
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.item}>Share</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
