import { defineConfig } from 'astro/config'

// Astro configuration
// - site/base set for GitHub Pages project site
// - trailingSlash ensures consistent URLs for static hosting
export default defineConfig({
  site: 'https://ajelinek.github.io/jmj-financial-coaching',
  trailingSlash: 'always'
});


