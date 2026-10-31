import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { EventItem } from '../../models/event.model';

@Component({
  standalone: true,
  selector: 'app-event-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-card.html',
  styleUrls: ['./event-card.css'],
})
export class EventCard {
  // required input: the event to display
  readonly event = input.required<EventItem>();

  // whether this event is currently a favorite
  readonly isFavorite = input<boolean>();

  // emits when user toggles favorite (no payload)
  readonly toggleFavorite = output<void>();

  // emits when user requests to delete the event (no payload)
  readonly delete = output<void>();

  // helper to call from template
  onToggle() {
    this.toggleFavorite.emit();
  }

  // helper to call from template
  onDelete() {
    this.delete.emit();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement | null;
    if (!img) {
      return;
    }

    img.src = 'assets/images/fallback-event.svg';
    img.onerror = null;
  }
}