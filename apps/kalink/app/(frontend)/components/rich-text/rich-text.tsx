import { Heading, Stack, Text } from '@kalink-ui/seedly';
import {
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { Fragment } from 'react';

import type { RichTextContent } from '@/types/cms';

import { headingRichText } from './rich-text.css';

function decodeFormat(format: unknown) {
  const result = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    code: false,
  };

  if (typeof format === 'number') {
    result.bold = (format & 1) !== 0;
    result.italic = (format & 2) !== 0;
    result.strikethrough = (format & 4) !== 0;
    result.underline = (format & 8) !== 0;
    result.code = (format & 16) !== 0;
    return result;
  }

  if (typeof format === 'string') {
    const flags = format.split(' ');
    result.bold = flags.includes('bold');
    result.italic = flags.includes('italic');
    result.strikethrough = flags.includes('strikethrough');
    result.underline = flags.includes('underline');
    result.code = flags.includes('code');
    return result;
  }

  return result;
}

function renderTextNode(node: SerializedTextNode, index: number) {
  const text = typeof node.text === 'string' ? node.text : '';
  if (!text) {
    return null;
  }

  const fmt = decodeFormat(node.format);
  let element: React.ReactNode = text;

  if (fmt.code) {
    element = <code key={`code-${index}`}>{element}</code>;
  }
  if (fmt.bold) {
    element = <strong key={`strong-${index}`}>{element}</strong>;
  }
  if (fmt.italic) {
    element = <em key={`em-${index}`}>{element}</em>;
  }
  if (fmt.underline) {
    element = <u key={`underline-${index}`}>{element}</u>;
  }
  if (fmt.strikethrough) {
    element = <s key={`strike-${index}`}>{element}</s>;
  }

  return <Fragment key={index}>{element}</Fragment>;
}

function renderChildren(children?: SerializedLexicalNode[]) {
  if (!Array.isArray(children) || children.length === 0) {
    return null;
  }

  return children.map((child, index) => renderNode(child, index));
}

function isElementNode(
  node: SerializedLexicalNode,
): node is SerializedElementNode {
  return (node as SerializedElementNode).children !== undefined;
}

function renderNode(node: SerializedLexicalNode, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph-styled': {
      const variant = (node as unknown as { variant?: string }).variant;
      const size = (node as unknown as { size?: string }).size;

      const allowedVariants = [
        'label',
        'body',
        'title',
        'headline',
        'display',
      ] as const;
      const allowedSizes = ['small', 'medium', 'large'] as const;

      const variantValue = allowedVariants.includes(
        variant as (typeof allowedVariants)[number],
      )
        ? (variant as (typeof allowedVariants)[number])
        : undefined;
      const sizeValue = allowedSizes.includes(
        size as (typeof allowedSizes)[number],
      )
        ? (size as (typeof allowedSizes)[number])
        : undefined;

      return (
        <Text
          use="p"
          key={key}
          wrap="balance"
          variant={variantValue}
          size={sizeValue}
        >
          {isElementNode(node) ? renderChildren(node.children) : null}
        </Text>
      );
    }
    case 'paragraph':
      return (
        <Text use="p" key={key} wrap="balance">
          {isElementNode(node) ? renderChildren(node.children) : null}
        </Text>
      );
    case 'heading': {
      type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const allowed: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      const candidate = (node as unknown as { tag?: string }).tag || 'h2';
      const tag: HeadingTag = allowed.includes(candidate as HeadingTag)
        ? (candidate as HeadingTag)
        : 'h2';

      return (
        <Heading
          key={key}
          use={tag}
          wrap="balance"
          className={headingRichText({ level: tag })}
        >
          {renderChildren((node as SerializedElementNode).children)}
        </Heading>
      );
    }
    case 'quote':
      return (
        <Text use="blockquote" key={key} wrap="balance">
          {isElementNode(node) ? renderChildren(node.children) : null}
        </Text>
      );
    case 'list': {
      const listType = (node as SerializedListNode).listType;
      const Comp = listType === 'number' ? 'ol' : 'ul';
      return (
        <Comp key={key}>
          {renderChildren((node as SerializedElementNode).children)}
        </Comp>
      );
    }
    case 'listitem':
    case 'list-item':
      return (
        <Text use="li" key={key} wrap="balance">
          {isElementNode(node)
            ? renderChildren((node as SerializedListItemNode).children)
            : null}
        </Text>
      );
    case 'link': {
      const { fields, children } = node as SerializedLinkNode;
      const href = fields.linkType === 'custom' ? fields.url || '#' : '#';
      const target = fields.newTab ? '_blank' : undefined;
      const rel = fields.newTab ? 'noreferrer noopener' : undefined;
      return (
        <a key={key} href={href} rel={rel} target={target}>
          {renderChildren(children)}
        </a>
      );
    }
    case 'linebreak':
    case 'line-break':
      return <br key={key} />;
    case 'text':
      return renderTextNode(node as SerializedTextNode, key);
    default:
      return (
        <Fragment key={key}>
          {isElementNode(node) ? renderChildren(node.children) : null}
        </Fragment>
      );
  }
}

export interface RichTextProps {
  content?: RichTextContent;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const root = (content as SerializedEditorState | null | undefined)?.root;
  const children = (root?.children ?? []) as SerializedLexicalNode[];

  if (!children.length) {
    return null;
  }

  return (
    <Stack spacing={2} className={className}>
      {renderChildren(children)}
    </Stack>
  );
}
