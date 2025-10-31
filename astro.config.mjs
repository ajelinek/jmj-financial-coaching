import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Astro configuration
// - site/base set for GitHub Pages project site
// - trailingSlash ensures consistent URLs for static hosting
export default defineConfig({
  site: 'https://ajelinek.github.io/jmj-financial-coaching',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ]
});


