// Polyfills

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

declare const ENV: string;

if ('production' === ENV) {
	// Production
} else {
	Error.stackTraceLimit = Infinity;

	require('zone.js/dist/long-stack-trace-zone');
}
