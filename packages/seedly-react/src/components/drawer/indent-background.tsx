import {
  DrawerPreview as Drawer,
  type DrawerIndentBackgroundProps,
} from '@base-ui/react/drawer';
import { indentBackground as indentBackgroundClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '@/utils/merge-class-name';

export function IndentBackground({
  className,
  ...props
}: DrawerIndentBackgroundProps) {
  return (
    <Drawer.IndentBackground
      {...props}
      className={mergeClassName(indentBackgroundClassName, className)}
    />
  );
}
