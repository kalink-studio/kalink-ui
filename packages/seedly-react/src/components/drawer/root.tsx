import { Drawer, type DrawerRootProps } from '@base-ui/react/drawer';

export function Root<Payload = unknown>(props: DrawerRootProps<Payload>) {
  return <Drawer.Root {...props} />;
}
