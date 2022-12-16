/**
 * @format
 */

import { SENTRY_DSN } from '@env'
import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'

import App from './src/App'
import { name as appName } from './app.json'

console.log(
	JSON.stringify(
		{
			SENTRY_DSN,
		},
		null,
		4,
	),
)

Sentry.init({
	dsn: SENTRY_DSN,
	// Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
	// We recommend adjusting this value in production.
	tracesSampleRate: 1.0,
	beforeSend: (event, hint) => {
		console.log('SENTRY: logging', event.exception)
		return event
	},
})

AppRegistry.registerComponent(appName, () => Sentry.wrap(App))
