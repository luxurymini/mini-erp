// @angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

// @ngrx
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { reducers, metaReducers, AppState, CustomSerializer } from './reducers';

// global style
import '../styles/styles.scss';

// App is our top level component
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

// components
import { NoContentComponent } from './components/no-content/no-content.component';
import { NaviComponent } from './shared/components/navi/navi.component';
import { TitleComponent } from './shared/components/title/title.component';
import { OptionComponent } from './shared/components/option/option.component';
import { CalcTableComponent } from './components/calc-table/calc-table.component';
import { TodayTableComponent } from './components/today-table/today-table.component';
import { TodayListComponent } from './components/today-list/today-list.component';
import { SubjectManagerComponent } from './components/subject-manager/subject-manager.component';
import { SubjectSearcherComponent } from './components/subject-searcher/subject-searcher.component';
import { SettingComponent } from './components/setting/setting.component';

declare const ENV: string;

// Application wide providers
const APP_PROVIDERS = [
	{ provide: APP_BASE_HREF, useValue: '/' },
	{ provide: RouterStateSerializer, useClass: CustomSerializer }
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

let CONDITIONAL_IMPORTS = [];

if (ENV === 'development') {
	console.log('loading react devtools');
	CONDITIONAL_IMPORTS.push(StoreModule.forRoot(reducers, { metaReducers }));
	CONDITIONAL_IMPORTS.push(StoreDevtoolsModule.instrument());
}

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		NoContentComponent,
		NaviComponent,
		TitleComponent,
		OptionComponent,
		CalcTableComponent,
		TodayTableComponent,
		TodayListComponent,
		SubjectManagerComponent,
		SubjectSearcherComponent,
		SettingComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		StoreModule.forRoot(reducers),
		StoreRouterConnectingModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		...CONDITIONAL_IMPORTS
	],
	providers: [
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {
	constructor(public appRef: ApplicationRef, private _store: Store<AppState>) { }

	public hmrOnInit(store: StoreType) {
		if (!store || !store.rootState) return;

		console.log('HMR store', JSON.stringify(store, null, 2));
		// set state
		if (store.rootState) {
			this._store.dispatch({
				type: 'SET_ROOT_STATE',
				payload: store.rootState
			});
		}

		// set input values
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
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

}
