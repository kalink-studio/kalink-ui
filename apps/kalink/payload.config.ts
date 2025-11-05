import path from 'path';
import { fileURLToPath } from 'url';

import { slugPlugin } from '@kalink-ui/canopy';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { CourseSessions } from './collections/CourseSessions';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { People } from './collections/People';
import { ServiceDescriptions } from './collections/ServiceDescriptions';
import { Services } from './collections/Services';
import { Testimonials } from './collections/Testimonials';
import { Users } from './collections/Users';
import { MainNavigation } from './globals/MainNavigation';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Services,
    ServiceDescriptions,
    People,
    Testimonials,
    CourseSessions,
  ],
  globals: [MainNavigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter(),
  email: resendAdapter({
    defaultFromAddress: 'info@kalink.ch',
    defaultFromName: 'Kalink Studio',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  sharp,
  plugins: [
    payloadCloudPlugin(),
    slugPlugin({
      collections: [
        {
          slug: 'pages',
          description:
            'Generated from the title. Keep it unique to avoid routing conflicts.',
          overrideDescription:
            'Enable manual editing to detach the slug from the title. Disable to sync it automatically.',
          sourceFieldPath: 'title',
        },
      ],
    }),
  ],
});
