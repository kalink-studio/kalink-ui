import { Avatar } from '@base-ui/react/avatar';
import * as styles from '@kalink-ui/seedly/components/avatar';

export default function ExampleAvatar() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Avatar.Root className={styles.root}>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          width="48"
          height="48"
          className={styles.image}
        />
        <Avatar.Fallback className={styles.fallback}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className={styles.root}>LT</Avatar.Root>
    </div>
  );
}
