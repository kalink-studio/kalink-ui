import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  SVGAttributes,
} from 'react';

import { VisuallyHidden } from '../visually-hidden';

export interface AccessibleIconProps {
  children?: ReactNode;
  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   */
  label: string;
}

export function AccessibleIcon({ children, label }: AccessibleIconProps) {
  const child = Children.only(children);
  return (
    <>
      {cloneElement(child as ReactElement<SVGAttributes<SVGElement>>, {
        'aria-hidden': 'true',
        focusable: 'false', // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
      })}
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  );
}
