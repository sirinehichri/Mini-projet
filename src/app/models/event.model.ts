// Event model and sample data for EventHub (French-friendly)
export type EventCategory = 'Atelier' | 'Conférence' | 'Sport';

export interface EventItem {
  id: number;
  title: string;
  category: EventCategory | string;
  date: string;
  place: string;
  price: number;
  imageUrl: string;
  description: string;
}

export type NewEventInput = Omit<EventItem, 'id'> & {
  imageUrl?: string;
};

export const DEFAULT_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';
