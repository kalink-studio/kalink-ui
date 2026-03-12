const normalizeBase = (input: string): string =>
  input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

export const formatSlug = (input: unknown): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return normalizeBase(input).replace(/^-+/, '').replace(/-+$/, '');
};

/**
 * Lenient formatter used while the user is actively editing a slug.
 *
 * Strips characters that can never appear in a slug while preserving hyphens
 * exactly as typed. This avoids collapsing runs of hyphens or adjacent
 * separator characters mid-keystroke, which would shift the cursor and make it
 * impossible to type compound slugs like `my-slug-word` naturally.
 *
 * The canonical {@link formatSlug} should be applied on blur / save to trim
 * leading/trailing hyphens and collapse duplicates.
 */
export const formatSlugLive = (input: unknown): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return (
    input
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      // Replace non-slug characters with a hyphen, but leave existing hyphens
      // untouched so the `+` quantifier cannot swallow them.
      .replace(/[^a-z0-9-]+/g, '-')
  );
};
