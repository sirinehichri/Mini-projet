import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DEFAULT_EVENT_IMAGE, EventCategory, NewEventInput } from '../../models/event.model';
import { EventService } from '../../services/event.service';

type EventFormValues = {
  title: string;
  category: EventCategory | '';
  date: string;
  place: string;
  price: number | null;
  imageUrl: string;
  description: string;
};

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm {
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);

  readonly eventForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
      nonNullable: true,
    }),
    category: new FormControl<EventCategory | ''>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    place: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    imageUrl: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(20)],
      nonNullable: true,
    }),
  });

  readonly formValue = toSignal(this.eventForm.valueChanges, {
    initialValue: this.eventForm.getRawValue(),
  });

  readonly formStatus = toSignal(this.eventForm.statusChanges, {
    initialValue: this.eventForm.status,
  });

  readonly formStatusText = computed(() => (this.formStatus() === 'VALID' ? 'VALID' : 'INVALID'));

  addEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formValues = this.eventForm.getRawValue() as EventFormValues;
    const newEvent: NewEventInput = {
      title: formValues.title.trim(),
      category: formValues.category as EventCategory,
      date: formValues.date,
      place: formValues.place.trim(),
      price: Number(formValues.price ?? 0),
      imageUrl: formValues.imageUrl?.trim() || DEFAULT_EVENT_IMAGE,
      description: formValues.description.trim(),
    };

    this.eventService.addEvent(newEvent);
    this.eventForm.reset();
    this.router.navigateByUrl('/events');
  }
}
