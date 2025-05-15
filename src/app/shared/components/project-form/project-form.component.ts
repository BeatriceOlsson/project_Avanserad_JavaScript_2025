import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <label>
        Namn:
        <input formControlName="name" placeholder="Projektnamn" required />
      </label>
      <br />

      <label>
        Beskrivning:
        <textarea formControlName="description" placeholder="Beskrivning"></textarea>
      </label>
      <br />

      <label>
        Deadline:
        <input type="date" formControlName="deadline" required />
      </label>
      <br />

      <button type="submit" [disabled]="form.invalid">
        {{ submitLabel }}
      </button>
    </form>
  `,
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Input() form!: FormGroup;
  @Input() submitLabel: string = 'Spara';
  @Output() submitted = new EventEmitter<any>();

  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
