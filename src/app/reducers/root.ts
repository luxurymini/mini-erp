import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
	router: RouterReducerState;
}

export const reducers = {
	router: routerReducer,
};
