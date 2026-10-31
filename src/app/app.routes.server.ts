import { RenderMode, ServerRoute } from '@angular/ssr';
import { EventService } from './services/event.service';

const eventService = new EventService();

export const serverRoutes: ServerRoute[] = [
  {
    path: 'events/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      eventService.events().map((event) => ({
        id: String(event.id),
      })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
