// Minimal Calendly popup loader with SSR guards and idempotent script injection

let calendlyAssetsLoaded = false

// Centralized default Calendly scheduling URL
export const defaultCalendlyUrl = 'https://calendly.com/jmj-financial-coaching/free-coaching-with-book-purchase'

function loadCalendlyAssetsOnce(hideLoader: boolean): void {
  if (calendlyAssetsLoaded) return
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  // Inject CSS once
  const existingCss = document.querySelector<HTMLLinkElement>('link[data-calendly-widget-css="true"]')
  if (!existingCss) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.setAttribute('data-calendly-widget-css', 'true')
    document.head.appendChild(link)
  }

  // Inject JS once
  const existingJs = document.querySelector<HTMLScriptElement>('script[data-calendly-widget-js="true"]')
  if (!existingJs) {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.defer = true
    script.setAttribute('data-calendly-widget-js', 'true')
    document.head.appendChild(script)
  }

  // Optionally hide Calendly's internal loader/spinner overlay
  if (hideLoader) {
    const existingStyle = document.querySelector<HTMLStyleElement>('style[data-calendly-custom-style="true"]')
    if (!existingStyle) {
      const style = document.createElement('style')
      style.setAttribute('data-calendly-custom-style', 'true')
      style.textContent = `
				.calendly-overlay .calendly-spinner { display: none !important; }
				.calendly-overlay .calendly-loading-spinner { display: none !important; }
			`
      document.head.appendChild(style)
    }
  }

  calendlyAssetsLoaded = true
}

type ThemeOptions = {
  primaryColor?: string
  textColor?: string
  backgroundColor?: string
}

type EnsureInput =
  | {
      url: string
      hideLoader?: boolean
      hideDetails?: boolean // hides profile/landing + event type details
      hideGdprBanner?: boolean
      theme?: ThemeOptions
    }
  | string

function rgbToHex(rgb: string): string | null {
  const match = rgb.trim().match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!match) return null
  const rHex = Number(match[1]).toString(16)
  const gHex = Number(match[2]).toString(16)
  const bHex = Number(match[3]).toString(16)
  const r = rHex.length < 2 ? '0' + rHex : rHex
  const g = gHex.length < 2 ? '0' + gHex : gHex
  const b = bHex.length < 2 ? '0' + bHex : bHex
  return `${r}${g}${b}`
}

function normalizeHex(color: string | undefined, fallback: string): string {
  if (!color) return fallback
  const c = color.replace(/^#/, '').trim()
  return c.length === 3
    ? c
        .split('')
        .map(ch => ch + ch)
        .join('')
    : c
}

function getThemeFromCss(): ThemeOptions {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {}
  }
  const styles = getComputedStyle(document.documentElement)
  const primary = styles.getPropertyValue('--color-primary') || '#0ea5e9'
  const text = styles.getPropertyValue('--color-text') || '#0f172a'
  const bg = styles.getPropertyValue('--color-bg') || '#ffffff'
  const primaryHex = primary.slice(0, 3) === 'rgb' ? rgbToHex(primary) : normalizeHex(primary, '0ea5e9')
  const textHex = text.slice(0, 3) === 'rgb' ? rgbToHex(text) : normalizeHex(text, '0f172a')
  const bgHex = bg.slice(0, 3) === 'rgb' ? rgbToHex(bg) : normalizeHex(bg, 'ffffff')
  return {
    primaryColor: primaryHex ?? '0ea5e9',
    textColor: textHex ?? '0f172a',
    backgroundColor: bgHex ?? 'ffffff',
  }
}

function buildCustomizedUrl(
  baseUrl: string,
  opts: { theme?: ThemeOptions; hideDetails?: boolean; hideGdprBanner?: boolean }
): string {
  try {
    const urlObj = new URL(baseUrl)
    const params = urlObj.searchParams
    const theme = {
      ...getThemeFromCss(),
      ...opts.theme,
    }
    const bg = normalizeHex(theme.backgroundColor, 'ffffff')
    const text = normalizeHex(theme.textColor, '0f172a')
    const primary = normalizeHex(theme.primaryColor, '0ea5e9')
    params.set('background_color', bg)
    params.set('text_color', text)
    params.set('primary_color', primary)

    if (opts.hideDetails) {
      params.set('hide_event_type_details', '1')
      params.set('hide_landing_page_details', '1')
    }
    if (opts.hideGdprBanner) {
      params.set('hide_gdpr_banner', '1')
    }

    urlObj.search = params.toString()
    return urlObj.toString()
  } catch {
    return baseUrl
  }
}

export function ensureCalendlyPopup(input: EnsureInput): { open: () => void } {
  const baseUrl = typeof input === 'string' ? input : input.url
  const hideLoader = typeof input === 'string' ? true : input.hideLoader ?? true
  const hideDetails = typeof input === 'string' ? true : input.hideDetails ?? true
  const hideGdprBanner = typeof input === 'string' ? true : input.hideGdprBanner ?? true
  const theme = typeof input === 'string' ? undefined : input.theme

  return {
    open: () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      loadCalendlyAssetsOnce(hideLoader)
      // Calendly global is provided by widget.js; call once it's available
      const tryOpen = () => {
        const CalendlyGlobal = (
          window as unknown as { Calendly?: { initPopupWidget?: (opts: { url: string }) => void } }
        ).Calendly
        if (CalendlyGlobal && typeof CalendlyGlobal.initPopupWidget === 'function') {
          const url = buildCustomizedUrl(baseUrl, { theme, hideDetails, hideGdprBanner })
          CalendlyGlobal.initPopupWidget({ url })
          return true
        }
        return false
      }

      if (tryOpen()) return
      // Poll briefly for script readiness without blocking UI
      let attempts = 0
      const maxAttempts = 20
      const interval = window.setInterval(() => {
        attempts += 1
        if (tryOpen() || attempts >= maxAttempts) {
          window.clearInterval(interval)
        }
      }, 100)
    },
  }
}

// Prefer named export only to keep API surface consistent
