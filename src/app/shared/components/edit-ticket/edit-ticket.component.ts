import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Ticket } from '../../../models/task.models';
import { TicketsServices } from '../../../core/services/tickets.service';
import { TicketFormService } from '../../../core/services/ticket-form.service';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { SharedMaterialModule } from '../../../models/disagn.modules';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TicketFormComponent, SharedMaterialModule],
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
    if(!this.ticketEdit) return;
    this.form = this.ticketFormService.createTicketForm(this.ticketEdit);
  }

  saveTicket(fromValue: any): void {
    const updateTicket: Ticket ={
      ...fromValue,
      dudate: new Date(fromValue.dudate).getTime(),
    };
    this.ticketsServices.uppdateTicket(updateTicket).subscribe(() => {
      this.editCompleted.emit();
    })
  }

  deleteTicket(): void {
    if (!this.ticketEdit?.id) return;
  
    this.ticketsServices.deleteTicket(this.ticketEdit.id).subscribe(() => {
      this.editCompleted.emit();
    })
  }
}
