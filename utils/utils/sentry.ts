import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

let inited = false
export function initSentry(dsn: string) {
  const environment = process.env.NODE_ENV
  if (inited || environment === 'development') return
  try {
    Sentry.init({
      enabled: true,
      dsn,
      autoSessionTracking: true,
      integrations: [new Integrations.BrowserTracing()],
      environment,
      tracesSampleRate: 1.0
    })
    console.info('Sentry initialized')
    addEventListenerOnWindowError()
    inited = true
  } catch (error) {
    console.error('Failed to initialize Sentry')
  }
}

// https://stackoverflow.com/questions/951791/javascript-global-event-mechanism
function addEventListenerOnWindowError() {
  window.onerror = function(msg, url, line, col, error: any) {
    if (error && /ChunkLoadError|SyntaxError/gi.test(error.stack)) {
      // @ts-ignore
      return window.location.reload(true)
    }
  }
}
