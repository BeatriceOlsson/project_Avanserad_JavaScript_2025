import { Component, inject, Input, Signal, signal } from "@angular/core";
import { Ticket } from "../../../models/task.models";
import { TicketsServices } from "../../../core/services/tickets.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TicketFilterPipe } from "../../pipes/ticket-filter.pipes";
import { EditTicketComponent } from "../edit-ticket/edit-ticket.component";
import { CreateNewTicketComponent } from "../create-new-ticket/create-new-ticket.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SharedMaterialModule } from "../../../models/disagn.modules";
import { PrioColorDirective } from "../../directives/prio-color.directive";
import { toSignal } from "@angular/core/rxjs-interop";



@Component ({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule, FormsModule, TicketFilterPipe, EditTicketComponent, CreateNewTicketComponent, RouterModule,SharedMaterialModule, PrioColorDirective],
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.scss'
})

export class TicketsListComponent{
    @Input() ticketEdit: Ticket | null=null;
    private ticketsServices = inject(TicketsServices);
    private route = inject(ActivatedRoute);

    statusFilter = signal<string> ('alla');
    selectedTickets = signal<Ticket | null>(null);
    projectID = signal<number | null> (null);

    ticket = toSignal(this.ticketsServices.getTickets(), {initialValue: []});

    constructor() {
        this.route.paramMap.subscribe(param => {
            const id = param.get('id');
            this.projectID.set(id !== null ? parseInt(id, 10) : null);
        });
    }

    edit(ticket: Ticket): void {
        this.selectedTickets.set (ticket);
    }

    handelEditComplete(): void {
        this.selectedTickets.set(null);
    }

    delete(id: number): void {
        this.ticketsServices.deleteTicket(id).subscribe(() => {
            this.reloadTickets();
        });
    }

    handelTicketAdded(): void {
        this.reloadTickets();
    }

    private reloadTickets() {
        this.ticket = toSignal(this.ticketsServices.getTickets(), {initialValue: []});
    }
}