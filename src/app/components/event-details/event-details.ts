import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  standalone: true,
  selector: 'app-event-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css'],
})
export class EventDetails {
  private readonly eventService = inject(EventService);

  // `id` is bound from the route param because app uses withComponentInputBinding()
  readonly id = input<string | null>();

  readonly event = computed(() => {
    const routeId = this.id();
    if (!routeId) {
      return null;
    }

    const numericId = Number(routeId);
    return Number.isNaN(numericId) ? null : this.eventService.getEventById(numericId);
  });
}
