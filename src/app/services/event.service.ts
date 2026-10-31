import { computed, Injectable, signal } from '@angular/core';
import type { EventItem, NewEventInput } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Données internes du service : source unique de vérité.
  private readonly _events = signal<EventItem[]>([
    {
      id: 1,
      title: 'Atelier de peinture en plein air',
      category: 'Atelier',
      date: '2026-11-05',
      place: 'Parc de la Tête d\'Or, Lyon',
      price: 25,
      imageUrl:
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
      description: 'Un atelier créatif pour découvrir les couleurs et développer une composition inspirée de la nature.',
    },
    {
      id: 2,
      title: 'Conférence UX & Design Systems',
      category: 'Conférence',
      date: '2026-12-02',
      place: 'Palais des Congrès, Paris',
      price: 299,
      imageUrl:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: 'Deux conférences pour explorer les bonnes pratiques de design, accessibilité et expérience utilisateur.',
    },
    {
      id: 3,
      title: 'Course communautaire du samedi',
      category: 'Sport',
      date: '2026-10-23',
      place: 'Parc de la Tête d\'Or, Lyon',
      price: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80',
      description: 'Une sortie sportive accessible à tous, avec un parcours convivial et une ambiance chaleureuse.',
    },
    {
      id: 4,
      title: 'Atelier cuisine locale',
      category: 'Atelier',
      date: '2026-09-18',
      place: 'Maison des artisans, Marseille',
      price: 35,
      imageUrl:
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
      description: 'Apprenez à préparer des recettes simples et généreuses inspirées des produits de saison.',
    },
    {
      id: 5,
      title: 'Soirée musicale en plein air',
      category: 'Conférence',
      date: '2026-11-12',
      place: 'Place de la République, Paris',
      price: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80',
      description: 'Une soirée gratuite avec des artistes émergents, des DJ sets et un moment de partage collectif.',
    },
    {
      id: 6,
      title: 'Rallye cycliste urbain',
      category: 'Sport',
      date: '2026-10-30',
      place: 'Place Bellecour, Lyon',
      price: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80',
      description: 'Un parcours ludique à travers la ville pour faire du vélo, rencontrer la communauté et bouger.',
    },
  ]);
  private readonly _favorites = signal<number[]>([]);

  // Exposition en lecture seule pour les composants.
  readonly events = this._events.asReadonly();
  readonly favorites = this._favorites.asReadonly();

  // Compteurs calculés à partir des signaux.
  readonly eventCount = computed(() => this._events().length);
  readonly favoriteCount = computed(() => this._favorites().length);
  readonly freeEventCount = computed(() => this._events().filter((event) => event.price === 0).length);

  getEventById(id: number): EventItem | null {
    return this._events().find((event) => event.id === id) ?? null;
  }

  addEvent(event: NewEventInput): EventItem {
    const nextId = this._events().reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1;
    const newEvent: EventItem = {
      ...event,
      id: nextId,
    };

    this._events.update((currentEvents) => [...currentEvents, newEvent]);
    return newEvent;
  }

  deleteEvent(id: number): void {
    this._events.update((currentEvents) => currentEvents.filter((event) => event.id !== id));
    this._favorites.update((currentFavorites) => currentFavorites.filter((favoriteId) => favoriteId !== id));
  }

  toggleFavorite(id: number): void {
    this._favorites.update((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id],
    );
  }
}
