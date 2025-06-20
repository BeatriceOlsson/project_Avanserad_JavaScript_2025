import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketsServices } from '../../../core/services/tickets.service';
import { Ticket } from '../../../models/task.models';
import { CommonModule } from '@angular/common';
import { TicketFormService } from '../../../core/services/ticket-form.service';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-create-new-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TicketFormComponent],
  templateUrl: './create-new-ticket.component.html',
  styleUrl: './create-new-ticket.component.scss',
})

//Tar in formulär datan användaren skappat för att behandla det och skickar datan till server för att få det sparat.
export class CreateNewTicketComponent {
  @Output() ticketAdded = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private ticketsService: TicketsServices,
    private ticketFormService: TicketFormService
  ){
    this.form = this.ticketFormService.createTicketForm();
  }

  saveTicket(formValue: any): void {
    const newTicket: Ticket = {
      ...formValue,
      dudate: new Date(this.form.value.dudate).getTime()
    };
    this.ticketsService.createTicket(newTicket).subscribe(() => {
      this.form.reset();
      this.ticketAdded.emit();
    });
  }
}
