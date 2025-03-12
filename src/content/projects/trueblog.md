---
title: 'trueblog'
pubDatetime: 2025-03-09
description: 'A static, minimalist, lightweight blog theme.'
image: 'https://ik.imagekit.io/truedaniyyel/trueblog.webp?updatedAt=1741537321608'
demoUrl: 'https://trueblog.pages.dev'
repoUrl: 'https://github.com/truedaniyyel/trueblog'
---

## Features

- **Built with [Astro](https://astro.build)**
- **SEO Setup**:
  - Dynamic OG image generation at build time using Satori and Sharp
  - Automated meta tags management
  - Built-in RSS feed generation (`rss.xml`)
  - Automatic sitemap generation
  - Robots.txt configuration
- **Security**:
  - Integrated Content Security Policy (CSP) headers
  - Dynamic security key generation using astro-shield
  - Custom script for SRI (`scripts/generate-csp-header.mjs`)

## Project Structure

```
trueblog/
├── public/              # Static assets
│   ├── fonts/             # Web fonts
│   ├── og-fonts/          # Fonts for OG image generation
│   ├── _headers           # Security headers configuration
│   └── favicon.svg
├── scripts/             # Build and utility scripts
│   └── generate-csp-header.mjs
├── src/                 # Source files
│   ├── assets/
│   │   └── uiIcons.ts
│   ├── components/        # Reusable Astro components
│   │   ├── Card.astro/
│   │   ├── Header.astro/
│   │   └── Footer.astro/
│   ├── content/         # Blog posts and content
│   │   ├── blog/          # Blog posts
│   │   └── projects/      # Project entries
│   ├── generated/       # Auto-generated files (e.g., sriHashes)
│   ├── layouts/         # Page layouts and templates
│   │   ├── BaseLayout.astro
│   │   ├── ErrorLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/           # Route pages
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── 404.astro
│   │   ├── 500.astro
│   │   ├── 503.astro
│   │   ├── index.astro
│   │   ├── og-image.webp.ts
│   │   ├── robots.txt.ts
│   │   └── rss.xml.ts
│   ├── styles/          # Global styles and CSS modules
│   ├── utils/           # Utility functions
│   ├── consts.ts           # Constants including SEO configuration
│   ├── content.config.ts   # Constants for Content collections
│   └── types.ts            # TypeScript type definitions
├── .gitignore          # Git ignore configuration
├── .prettierignore     # Prettier ignore configuration
├── .prettierrc         # Prettier code formatting configuration
├── LICENSE             # Project license file
├── README.md           # Project documentation
├── astro.config.mjs    # Astro configuration file
├── ec.config.mjs       # Expressive Code configuration
├── eslint.config.mjs   # ESLint configuration
├── package.json        # Project dependencies and scripts
├── pnpm-lock.yaml      # pnpm lock file
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

This guide will walk you through the basic configuration and customization of
your trueblog installation.

### Basic Site Configuration

The primary configuration is handled through the `src/consts.ts` file. This file
contains essential settings that define your blog's identity and behavior.

#### Core Configuration

```typescript title='src/consts.ts'
export const SITE: Site = {
  TITLE: 'Name of your blog',
  DESCRIPTION: 'Description for your blog',
  AUTHOR: 'Name of the author',
  CANONICAL_URL: import.meta.env.DEV
    ? 'http://localhost:4321'
    : 'https://example.com',
  LOCALE: 'en',
  CATEGORIES: ['blog', 'projects'],
  OG_IMAGE: '/og-image.webp',

  TWITTER: {
    CREATOR: '@',
    CARD: 'summary_large_image',
  },

  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
  SCHEDULED_POST_MARGIN: minutesToMilliseconds(15),
};
```

### Configuration Fields Reference

| Field                      | Required | Description                                                   |
| -------------------------- | :------: | ------------------------------------------------------------- |
| `TITLE`                    |    ✅    | Your blog's title - appears in header, SEO, and RSS feeds     |
| `DESCRIPTION`              |    ✅    | Brief blog description for SEO and meta tags                  |
| `AUTHOR`                   |    ✅    | Site author's name                                            |
| `CANONICAL_URL`            |    ✅    | Your site's base URL (automatically switches for development) |
| `LOCALE`                   |    ❌    | Site language code (defaults to 'en')                         |
| `CATEGORIES`               |    ✅    | Content categories for organization                           |
| `OG_IMAGE`                 |    ✅    | Default social media preview image path                       |
| `TWITTER.CREATOR`          |    ❌    | Twitter handle for attribution                                |
| `TWITTER.CARD`             |    ❌    | Twitter card type (summary_large_image recommended)           |
| `NUM_POSTS_ON_HOMEPAGE`    |    ✅    | Number of posts to show on homepage                           |
| `NUM_PROJECTS_ON_HOMEPAGE` |    ✅    | Number of projects to display on homepage                     |
| `SCHEDULED_POST_MARGIN`    |    ✅    | Buffer time for scheduled posts (in milliseconds)             |

### Social Media Configuration

Configure your social media links in the same `src/consts.ts` file:

```typescript title='src/consts.ts'
export const SOCIALS: Socials = [
  {
    NAME: 'Facebook',
    ICON: 'facebook',
    LABEL: `${SITE.AUTHOR} on Facebook`,
    HREF: 'https://www.facebook.com/johndoe',
  },
  // Add more social media platforms here
];
```

#### Social Media Fields Reference

| Field   | Required | Description                     |
| ------- | :------: | ------------------------------- |
| `NAME`  |    ✅    | Platform name                   |
| `ICON`  |    ✅    | Platform icon identifier        |
| `LABEL` |    ✅    | Accessibility label and tooltip |
| `HREF`  |    ✅    | Profile URL                     |

### Open Graph Image Configuration

trueblog generates Open Graph images automatically at build time using
[Satori](https://github.com/vercel/satori) and
[Sharp](https://github.com/lovell/sharp). You can customize these images for
both posts and your site.

#### Template Customization

The OG image templates are located in `src/utils/og-images/templates/`:

- `postTemplate.ts` - For individual post images
- `siteTemplate.ts` - For site-wide default images

Example template modification:

```typescript title='src/utils/og-images/templates/postTemplate.ts'
const markup = html(`
  // Your custom HTML template here
`);
```

#### Image Configuration

Customize image generation settings in `src/utils/og-images/config.ts`:

```typescript title='src/utils/og-images/config.ts'
import { readFileSync } from 'fs';
import type { ImageConfig, SvgConfig } from './types';
import type { Font } from 'satori';

// Custom font configuration
const interRegular = readFileSync(
  `${process.cwd()}/public/og-fonts/inter-v18-latin-regular.ttf`
);
const interBlack = readFileSync(
  `${process.cwd()}/public/og-fonts/inter-v18-latin-900.ttf`
);

// Image format configuration
export const DEFAULT_IMAGE: ImageConfig = {
  format: 'webp',
  webpOptions: {
    quality: 90,
  },
};

// SVG dimensions
export const DEFAULT_SVG: SvgConfig = {
  width: 1200,
  height: 630,
  embedFont: true,
};

// Font configuration
export const DEFAULT_FONTS: Font[] = [
  {
    name: 'Inter',
    data: interRegular,
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: interBlack,
    weight: 900,
    style: 'normal',
  },
];
```

#### Configuration Options Reference

Font Configuration:

| Option   | Description                         |
| -------- | ----------------------------------- |
| `name`   | Font family name                    |
| `data`   | Font file data                      |
| `weight` | Font weight (400=regular, 900=bold) |
| `style`  | Font style ('normal'/'italic')      |

Image Format Options:

| Format | Available Options                                          |
| ------ | ---------------------------------------------------------- |
| JPEG   | quality (1-100), chromaSubsampling, progressive, mozjpeg   |
| WebP   | quality (1-100), lossless, smartSubsample, effort (0-6)    |
| AVIF   | quality (1-100), lossless, chromaSubsampling, effort (0-9) |

SVG Configuration:

| Option      | Description                   |
| ----------- | ----------------------------- |
| `width`     | Image width (default: 1200px) |
| `height`    | Image height (default: 630px) |
| `embedFont` | Whether to embed fonts        |

### Content Security Policy (CSP) Configuration

trueblog comes with pre-configured security headers optimized for
[Cloudflare Pages](https://pages.cloudflare.com/)

#### Default Security Headers

The main security headers are defined in `public/_headers`:

```text title='public/_headers'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 0
  Referrer-Policy: no-referrer
  Permissions-Policy: accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(self), fullscreen=(self), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(self), xr-spatial-tracking=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Access-Control-Allow-Origin: https://example.com
```

> **Note:** Make sure to change `https://example.com` in
> `Access-Control-Allow-Origin: https://example.com` to your domain.
> Alternatively, you can remove this line entirely if you don't need to specify
> CORS access control.

#### Automatic CSP Hash Generation

trueblog uses [Astro Shield](https://github.com/kindspells/astro-shield) to
automatically generate Content Security Policy hashes during the build process.
The system works as follows:

1. During build, `astro-shield` generates hashes in
   `src/generated/sriHashes.mjs`
2. The `postbuild` script (`scripts/generate-csp-header.mjs`) automatically adds
   these hashes to the `_headers` file

Here's the script that handles the CSP header generation:

```javascript title='scripts/generate-csp-header.mjs'
import fs from 'fs/promises';
import path from 'path';
import {
  inlineScriptHashes,
  inlineStyleHashes,
} from '../src/generated/sriHashes.mjs';

const headersPath = path.join(process.cwd(), 'dist', '_headers');

async function generateCSPHeader() {
  try {
    // Combine all script hashes
    const scriptHashes = new Set([...inlineScriptHashes]);

    // Combine all style hashes
    const styleHashes = new Set([...inlineStyleHashes]);

    // Generate CSP header
    const cspHeader =
      `Content-Security-Policy: default-src 'self'; object-src 'self'; script-src 'self' ${Array.from(
        scriptHashes
      )
        .map(hash => `'${hash}'`)
        .join(' ')}; connect-src 'self'; style-src 'self' ${Array.from(
        styleHashes
      )
        .map(hash => `'${hash}'`)
        .join(
          ' '
        )}; base-uri 'self'; img-src 'self' https://example.com; frame-ancestors 'none'; worker-src 'self'; manifest-src 'none'; form-action 'self';`.trim();

    // Read existing _headers file
    let headersContent = await fs.readFile(headersPath, 'utf-8');

    headersContent += '\n  ' + cspHeader;

    // Write updated content back to _headers file
    await fs.writeFile(headersPath, headersContent);

    console.log('CSP header generated and _headers file updated successfully.');
  } catch (error) {
    console.error('Error generating CSP header:', error);
  }
}

generateCSPHeader();
```

In the CSP header, you will find the directive:

```javascript title='scripts/generate-csp-header.mjs'
img-src 'self' https://example.com;
```

This means images are allowed from the current origin ('self') and
https://example.com. If you load images from a different source, replace
https://example.com with your own image domain. If you only use local images,
you can remove https://example.com entirely to enforce stricter security.

Same goes for fonts:

If you are using custom fonts, you need to ensure that they are included in your
CSP. By default, you can import fonts into the public/fonts folder and reference
them locally. However, if you are loading fonts from an external provider (e.g.,
Google Fonts), you need to update your CSP like this:

```javascript title='scripts/generate-csp-header.mjs'
font-src 'self' https://example.com;
```

Replace https://example.com with the actual URL of your font provider. This
ensures that only the specified sources can load fonts, improving security while
allowing external font usage.

### Syntax Highlighting

For syntax highlighting,
[Expressive Code](https://github.com/expressive-code/expressive-code) is used.  
Its configuration is defined in `ec.config.mjs`.

```mjs title='ec.config.mjs'
import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  themes: ['andromeeda'],

  styleOverrides: {
    // You can also override styles
    borderRadius: '0.5rem',
    uiFontFamily: 'JetBrains Mono',
    codeFontFamily: 'JetBrains Mono',
    codeFontSize: '1rem',
  },
});
```

### Post Metadata Reference

#### Basic Fields

You can find frontmatter structure in `src/content.config.ts`

| Field        | Required | Type                   | Example / Default                                          | Description                                              |
| ------------ | :------: | ---------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| title        |    ✅    | string                 | "My Blog Post"                                             | 1-100 characters                                         |
| pubDatetime  |    ✅    | date (z.coerce.date()) | "2025-03-04T16:06:19Z"<br>1709571979000<br>"March 4, 2025" | Can accept ISO 8601, timestamps, or natural date formats |
| description  |    ✅    | string                 | "Description of my post"                                   | 1-320 characters                                         |
| draft        |    ❌    | boolean                | false                                                      | If true, post won't be published                         |
| author       |    ❌    | string                 | "truedaniyyel"                                             | Defaults to SITE.AUTHOR                                  |
| modDatetime  |    ❌    | date (z.coerce.date()) | "2025-03-04T16:06:19Z"                                     | Optional modification date                               |
| image        |    ❌    | image / string         | "./images/post.png"                                        | Min size 1200×630px if provided                          |
| demoUrl      |    ❌    | string (URL)           | "https://demo.example.com"                                 | Must be a valid URL                                      |
| repoUrl      |    ❌    | string (URL)           | "https://github.com/user/repo"                             | Must be a valid URL                                      |
| canonicalURL |    ❌    | string (URL)           | "https://blog.example.com/post"                            | Must be a valid URL                                      |
| editPost     |    ❌    | object                 | See below                                                  | Post editing configuration                               |

#### editPost Object Properties

| Property       | Required | Type    | Example / Default                        | Description                  |
| -------------- | :------: | ------- | ---------------------------------------- | ---------------------------- |
| disabled       |    ❌    | boolean | false                                    | Disable the edit button      |
| url            |    ❌    | string  | "https://github.com/user/repo/edit/main" | Edit URL                     |
| text           |    ❌    | string  | "Edit this post"                         | Edit button text             |
| appendFilePath |    ❌    | boolean | true                                     | Append file path to edit URL |

#### Quick Copy Template

```yaml
---
title: ''
pubDatetime: 2025-03-04
description: ''
draft: false
author: 'truedaniyyel'
# modDatetime: 2025-03-04
# image: "./images/post.png"
# demoUrl: ""
# repoUrl: ""
# canonicalURL: ""
# editPost:
#   url: ""
#   text: "Edit this post"
#   appendFilePath: true
---
```

### Next Steps

After configuring these basic settings, you can:

1. Start creating content in the `src/content/` directory
2. Customize your site's appearance
3. Add or modify components in `src/components/`
4. Deploy your site using your preferred hosting platform

### Deployment Options

#### Cloudflare

Configuration works out of the box with Cloudflare.

#### Other Hosting Platforms

For other hosting platforms, minor adjustments with CSP and SRI may be needed:

- **Vercel**: Delete the `scripts` folder and follow the
  [Vercel integration guide](https://astro-shield.kindspells.dev/guides/hosting-integrations/vercel/)
- **Netlify**: Delete the `scripts` folder and follow the
  [Netlify integration guide](https://astro-shield.kindspells.dev/guides/hosting-integrations/netlify/)

The security features work seamlessly with various Astro configurations,
including Astro + Svelte or other frameworks.
