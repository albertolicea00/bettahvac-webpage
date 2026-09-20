/**
 * @file Microsoft Clarity behavioral analytics integration.
 * Single source of truth for Clarity initialization and event tracking.
 */

import Clarity from '@microsoft/clarity'

/**
 * Default Project ID for BettaHVAC on Microsoft Clarity.
 * Can be overridden via Vite's `VITE_CLARITY_PROJECT_ID` environment variable.
 * @type {string}
 */
export const DEFAULT_CLARITY_PROJECT_ID = 'yl9u4hr2i9'

/**
 * Resolves the active Clarity project ID from environment variables or default fallback.
 * @returns {string}
 */
export function getClarityProjectId() {
  return (
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.VITE_CLARITY_PROJECT_ID) ||
    DEFAULT_CLARITY_PROJECT_ID
  )
}

/**
 * Options for initializing Microsoft Clarity.
 * @typedef {Object} ClarityInitOptions
 * @property {string} [projectId] - Custom project ID to initialize.
 * @property {boolean} [enableInDev] - Force initialization in local development.
 */

/**
 * Initializes Microsoft Clarity tracking.
 *
 * Best practices implemented:
 * 1. Safe guard against SSR / non-browser execution (`window` check).
 * 2. Disabled by default in local dev (`import.meta.env.DEV`) to avoid polluting
 *    heatmaps and session recordings with developer reloads, unless `enableInDev`
 *    or `VITE_CLARITY_DEV=true` is set.
 * 3. Prevents duplicate script injections (handled by library and ID check).
 *
 * @param {ClarityInitOptions} [options]
 * @returns {boolean} True if initialized, false if skipped.
 */
export function initClarity(options = {}) {
  if (typeof window === 'undefined') {
    return false
  }

  const isDev = Boolean(
    typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.DEV
  )

  const forceDev = Boolean(
    options.enableInDev ||
      (typeof import.meta !== 'undefined' &&
        import.meta.env &&
        import.meta.env.VITE_CLARITY_DEV === 'true')
  )

  if (isDev && !forceDev) {
    console.info(
      '[Clarity] Tracking disabled in development mode. ' +
        'Set VITE_CLARITY_DEV=true in your environment to test locally.'
    )
    return false
  }

  const projectId = options.projectId || getClarityProjectId()
  if (!projectId) {
    console.warn('[Clarity] Initialization skipped: No project ID provided.')
    return false
  }

  try {
    Clarity.init(projectId)
    return true
  } catch (err) {
    console.error('[Clarity] Failed to initialize Microsoft Clarity:', err)
    return false
  }
}

/**
 * Tracks a custom event in Microsoft Clarity.
 *
 * @param {string} eventName - Custom event name (e.g. 'contact_phone_click', 'review_submit')
 */
export function trackClarityEvent(eventName) {
  if (typeof window === 'undefined') return
  try {
    Clarity.event(eventName)
  } catch (err) {
    console.error('[Clarity] Failed to log event:', err)
  }
}

export { Clarity }
