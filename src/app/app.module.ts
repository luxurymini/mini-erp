// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

// @ngrx  not used 2017-12-01
// import { EffectsModule } from '@ngrx/effects';
// import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
// import { StoreModule } from '@ngrx/store';
// import { Store } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// environment
import { ENV_PROVIDERS } from './environment';

// route
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

// global style
import '../styles/styles.scss';

declare const ENV: string;

// Application wide providers
const APP_PROVIDERS = [
	{ provide: APP_BASE_HREF, useValue: '/' },
];

interface InternalStateType {
	[key: string]: any;
}

interface StoreType {
	state: InternalStateType;
	rootState: InternalStateType;
	restoreInputValues: () => void;
	disposeOldHosts: () => void;
}

const CONDITIONAL_IMPORTS = [];

if (ENV === 'development') {
	// console.log('loading react devtools');
	// CONDITIONAL_IMPORTS.push(StoreModule.forRoot(reducers, { metaReducers }));
	// CONDITIONAL_IMPORTS.push(StoreDevtoolsModule.instrument());
}

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		// StoreModule.forRoot(reducers),
		// StoreRouterConnectingModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		...CONDITIONAL_IMPORTS,
	],
	providers: [
		ENV_PROVIDERS,
		APP_PROVIDERS,
	],
})

export class AppModule {
	constructor() { }
	/*
	constructor(public appRef: ApplicationRef, private _store: Store<AppState>) { }

	public hmrOnInit(store: StoreType) {
		if (!store || !store.rootState) return;
		console.log('HMR store', JSON.stringify(store, null, 2));

		// set state
		if (store.rootState) {
			this._store.dispatch({
				type: 'SET_ROOT_STATE',
				payload: store.rootState,
			});
		}

		// set input values
		if ('restoreInputValues' in store) {
			const restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}

		this.appRef.tick();
		Object.keys(store).forEach(prop => delete store[prop]);
	}

	public hmrOnDestroy(store: StoreType) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// save state
		this._store.take(1).subscribe(s => store.rootState = s);
		// recreate root elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: StoreType) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
	*/
}
