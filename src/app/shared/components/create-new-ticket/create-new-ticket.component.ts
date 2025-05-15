import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketsServices } from '../../../core/services/tickets.services';
import { Ticket } from '../../../models/task.models';
import { CommonModule } from '@angular/common';
import { TicketFormService } from '../../../core/services/ticket-form.services';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-create-new-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TicketFormComponent],
  templateUrl: './create-new-ticket.component.html',
  styleUrl: './create-new-ticket.component.scss',
})
export class CreateNewTicketComponent {
  @Output() ticketAdded = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private ticketsService: TicketsServices,
    private ticketFormService: TicketFormService
  ){
    this.form = this.ticketFormService.createTicketForm();
    this.form.reset();
  }

  saveTicket(formValue: any): void {
    const newTicket: Ticket = {
      ...formValue,
      dudate: new Date(this.form.value.dudate).getTime()
    };

    this.ticketsService.createTicket(newTicket).subscribe(() => {
      console.log('Ticket skappades: ', newTicket);
      this.form.reset();
      this.ticketAdded.emit();
    });
  }
}
