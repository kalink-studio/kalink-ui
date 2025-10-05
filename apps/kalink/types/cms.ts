import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type Tint =
  | 'primary'
  | 'secondary'
  | 'primaryContainer'
  | 'secondaryContainer';

export interface AnchorFields {
  showInSubNavigation?: boolean;
  subNavigationLabel?: string;
  anchorSlug?: string;
}

export interface Media {
  id: string;
  alt: string;
  url: string;
}

export type CtaVariant = 'filled' | 'outlined' | 'bare' | 'ghost';

export type IntroBlock = AnchorFields & {
  blockType: 'introBlock';
  blockName?: string | null;
  id: string;
  title: string;
  body?: RichTextContent;
  backgroundTint: Tint;
  ctas?: {
    id: string;
    label: string;
    media?: Media | string | null;
    variant: CtaVariant;
  }[];
};

export type MediaBannerBlock = AnchorFields & {
  blockType: 'mediaBanner';
  blockName?: string | null;
  id: string;
  items: (AnchorFields & {
    id: string;
    title: string;
    body?: RichTextContent;
    image?: Media | string | null;
    direction: 'start' | 'end';
  })[];
};

export type FiftyFiftyBlock = AnchorFields & {
  blockType: 'fiftyFifty';
  blockName?: string | null;
  id: string;
  title: string;
  body?: RichTextContent;
  backgroundTint: Tint;
  image?: Media | string | null;
  direction: 'start' | 'end';
};

export type ListItemsBlock = AnchorFields & {
  blockType: 'listItems';
  blockName?: string | null;
  id: string;
  title: string;
  backgroundTint: Tint;
  items: {
    id: string;
    label: string;
  }[];
};

export type ServicesGridBlock = AnchorFields & {
  blockType: 'servicesGrid';
  blockName?: string | null;
  id: string;
  title: string;
  items: {
    id: string;
    entry?: Service | ServiceDescription | string | null;
  }[];
};

export type TeamBlock = AnchorFields & {
  blockType: 'team';
  blockName?: string | null;
  id: string;
  title: string;
  items: (AnchorFields & {
    id: string;
    person?: Person | string | null;
    direction: 'start' | 'end';
    backgroundTint: Exclude<Tint, 'primary' | 'secondary'>;
  })[];
};

export type TestimonialsRowBlock = AnchorFields & {
  blockType: 'testimonialsRow';
  blockName?: string | null;
  id: string;
  title: string;
  items: {
    id: string;
    testimonial?: Testimonial | string | null;
    tintScheme: Extract<Tint, 'primaryContainer' | 'secondaryContainer'>;
  }[];
};

export interface ContactFormField {
  id: string;
  fieldType: 'textField' | 'select' | 'textarea';
  fieldName: string;
  fieldLabel: string;
  required?: boolean;
  optionsSource?: CourseSessions | string | null;
}

export type ContactsBlock = AnchorFields & {
  blockType: 'contacts';
  blockName?: string | null;
  id: string;
  title: string;
  subtitle?: string;
  backgroundTint: Tint;
  information?: RichTextContent;
  formType: 'message' | 'inscription';
  formFields: ContactFormField[];
  showMap?: boolean;
  location?: [number, number];
};

export type Block =
  | IntroBlock
  | MediaBannerBlock
  | FiftyFiftyBlock
  | ListItemsBlock
  | ServicesGridBlock
  | TeamBlock
  | TestimonialsRowBlock
  | ContactsBlock;

export type BlockType = Block['blockType'];

export interface Service {
  id: string;
  title: string;
  slug: string;
  backgroundTint: Extract<Tint, 'primaryContainer' | 'secondaryContainer'>;
  picture?: Media | string | null;
}

export interface ServiceDescription {
  id: string;
  title: string;
  slug: string;
  description: string;
  backgroundTint: Extract<Tint, 'primaryContainer' | 'secondaryContainer'>;
}

export interface Person {
  id: string;
  slug: string;
  givenName: string;
  surname: string;
  jobTitle?: string;
  summary?: RichTextContent;
  picture?: Media | string | null;
}

export interface Testimonial {
  id: string;
  slug: string;
  givenName: string;
  text: string;
}

export interface CourseSessions {
  id: string;
  slug: string;
  title: string;
  items: {
    id: string;
    label: string;
    value: string;
  }[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  navigationLabel?: string;
  tint: 'primary' | 'secondary';
  isHomepage?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: Media | string | null;
  };
  blocks: Block[];
}

export interface MainNavigationItem {
  id: string;
  page?:
    | Page
    | string
    | number
    | {
        id?: string | number;
        slug?: string;
      }
    | null;
  labelOverride?: string;
}

export type RichTextContent = SerializedEditorState | null | undefined;
