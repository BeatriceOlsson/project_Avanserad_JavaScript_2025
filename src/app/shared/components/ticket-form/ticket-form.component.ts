import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../models/disagn.modules';
import { Ticket } from '../../../models/task.models';

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
  @Output() submitted = new EventEmitter<Ticket>();

  //Hanterar formulär data från användare, kontrolerar datan och skickar den vidare för att sparas.
  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
