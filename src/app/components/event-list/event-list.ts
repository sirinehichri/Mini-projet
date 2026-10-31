import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  private readonly eventService = inject(EventService);

  readonly events = this.eventService.events;
  readonly favorites = this.eventService.favorites;
  readonly eventCount = this.eventService.eventCount;
  readonly favoriteCount = this.eventService.favoriteCount;
  readonly freeEventCount = this.eventService.freeEventCount;

  readonly selectedCategory = signal<string | null>(null);
  readonly categories = computed(() => [...new Set(this.events().map((event) => event.category))]);
  readonly filteredEvents = computed(() => {
    const currentCategory = this.selectedCategory();
    return currentCategory ? this.events().filter((event) => event.category === currentCategory) : this.events();
  });

  toggleFavorite(id: number): void {
    this.eventService.toggleFavorite(id);
  }

  deleteEvent(id: number): void {
    const confirmed = window.confirm('Supprimer cet événement ?');
    if (!confirmed) {
      return;
    }

    this.eventService.deleteEvent(id);
  }
}