import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { ApplicationRef, enableProdMode } from '@angular/core';

// Environment Providers
let PROVIDERS: any[] = [
	// common env directives
];

declare const ENV: string;

let _decorateModuleRef = <T>(value: T): T => value;
if ('production' === ENV) {
	enableProdMode();

	// Production
	_decorateModuleRef = (modRef: any) => {
		disableDebugTools();
		return modRef;
	};

	PROVIDERS = [
		...PROVIDERS,
		// custom providers in production
	];
} else {
	_decorateModuleRef = (modRef: any) => {
		const appRef = modRef.injector.get(ApplicationRef);
		const cmpRef = appRef.components[0];

		let _ng = (window as any).ng;
		enableDebugTools(cmpRef);
		(window as any).ng.probe = _ng.probe;
		(window as any).ng.coreTokens = _ng.coreTokens;
		return modRef;
	};

	// Development
	PROVIDERS = [
		...PROVIDERS,
		// custom providers in development
	];
}

export const decorateModuleRef = _decorateModuleRef;
export const ENV_PROVIDERS = [...PROVIDERS];
