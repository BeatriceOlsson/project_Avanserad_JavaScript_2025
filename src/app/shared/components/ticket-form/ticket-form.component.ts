import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <input formControlName="title" placeholder="Titel" required />
      <input formControlName="description" placeholder="Beskrivning" />
      <input formControlName="dudate" type="date" />
      <select formControlName="status">
        <option value="">Välj status</option>
        <option value="todo">Att göra</option>
        <option value="done">Klar</option>
      </select>
      <select formControlName="priority">
        <option value="">Välj prioritet</option>
        <option value="low">Låg</option>
        <option value="high">Hög</option>
      </select>
      <input type="checkbox" formControlName="completed" /> Klart
      <button type="submit" [disabled]="form.invalid">Spara</button>
    </form>
  `,
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  @Input() form!: FormGroup;
  @Output() submitt = new EventEmitter<any>();

  submitForm() {
    if (this.form.valid) {
      this.submitt.emit(this.form.value);
    }
  }
}
