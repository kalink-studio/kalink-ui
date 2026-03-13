import { createImageTransformDerivativeCollection } from '@kalink-ui/canopy';

export const MediaDerivatives = createImageTransformDerivativeCollection({
  access: {
    read: () => true,
  },
  slug: 'mediaDerivatives',
  sourceRelationTo: 'media',
  upload: true,
});
