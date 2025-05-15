import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Ticket } from '../../../models/task.models';
import { TicketsServices } from '../../../core/services/tickets.services';
import { TicketFormService } from '../../../core/services/ticket-form.services';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TicketFormComponent],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.scss'
})
export class EditTicketComponent {
  @Input() ticketEdit!: Ticket;
  @Output() editCompleted = new EventEmitter<void>();
  form!: FormGroup;

  constructor(
    private ticketsServices: TicketsServices,
    private ticketFormService: TicketFormService
  ){}

  ngOnInit() {
    this.form = this.ticketFormService.createTicketForm(this.ticketEdit);
  }

  saveTicket(fromValue: any): void {
    const updateTicket: Ticket ={
      ...fromValue,
      dudate: new Date(fromValue.dudate).getTime(),
    };

    this.ticketsServices.uppdateTicket(updateTicket).subscribe(() => {
      console.log('Ticket uppdaterat: ', updateTicket);
      this.editCompleted.emit();
    })
  }

  deleteTicket(): void {
    if (!this.ticketEdit?.id) return;
  
    this.ticketsServices.deleteTicket(this.ticketEdit.id).subscribe(() => {
      console.log('Ticket borttagen:', this.ticketEdit.id);
      this.editCompleted.emit(); // Meddela att edit är klar, så att listan kan uppdateras och edit-komponenten stängas
    });
  }
}
