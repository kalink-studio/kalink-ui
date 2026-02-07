import { Separator } from '@base-ui/react/separator';
import * as styles from '@kalink-ui/seedly/components/separator';

export default function ExampleSeparator() {
  return (
    <div className={styles.container}>
      <a href="#" className={styles.link}>
        Home
      </a>
      <a href="#" className={styles.link}>
        Pricing
      </a>
      <a href="#" className={styles.link}>
        Blog
      </a>
      <a href="#" className={styles.link}>
        Support
      </a>

      <Separator orientation="vertical" className={styles.separator} />

      <a href="#" className={styles.link}>
        Log in
      </a>
      <a href="#" className={styles.link}>
        Sign up
      </a>
    </div>
  );
}
