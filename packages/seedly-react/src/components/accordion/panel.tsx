import { Accordion, type AccordionPanelProps } from '@base-ui/react/accordion';
import { panel as panelClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '../../utils/merge-class-name';

export function Panel({ className, ...props }: AccordionPanelProps) {
  return (
    <Accordion.Panel
      {...props}
      className={mergeClassName(panelClassName, className)}
    />
  );
}
