import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'events', pathMatch: 'full' },
	{
		path: 'events',
		loadComponent: () => import('./components/event-list/event-list').then(m => m.EventList),
	},
	{
		path: 'events/add',
		loadComponent: () => import('./components/event-form/event-form').then(m => m.EventForm),
	},
	{
		path: 'events/:id',
		loadComponent: () => import('./components/event-details/event-details').then(m => m.EventDetails),
	},
	{
		path: 'about',
		loadComponent: () => import('./components/about/about').then(m => m.About),
	},
	{
		path: '**',
		loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
	},
];
