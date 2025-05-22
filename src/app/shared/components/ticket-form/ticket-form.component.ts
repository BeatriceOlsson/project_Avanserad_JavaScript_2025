import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../models/disagn.modules';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  @Input() form!: FormGroup;
  @Input() submitLabel: string = 'Spara';
  @Output() submitt = new EventEmitter<any>();

  submitForm() {
    if (this.form.valid) {
      this.submitt.emit(this.form.value);
    }
  }
}
