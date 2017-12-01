import { Routes } from '@angular/router';
import { NoContentComponent } from './components/no-content/no-content.component';

export const ROUTES: Routes = [
	{ path: '**', component: NoContentComponent },
];
