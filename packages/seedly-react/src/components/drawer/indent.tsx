import { Drawer, type DrawerIndentProps } from '@base-ui/react/drawer';
import { indent as indentClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';

export function Indent({ className, ...props }: DrawerIndentProps) {
  return (
    <Drawer.Indent
      {...props}
      className={mergeClassName(indentClassName, className)}
    />
  );
}
