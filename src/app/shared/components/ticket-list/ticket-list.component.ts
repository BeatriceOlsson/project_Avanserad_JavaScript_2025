import { Component, OnInit } from "@angular/core";
import { Ticket } from "../../../models/task.models";
import { TicketsServices } from "../../../core/services/tickets.services";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TicketFilterPipe } from "../../pipes/ticket-filter.pipes";


@Component ({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule, FormsModule, TicketFilterPipe],
    templateUrl: './ticket-list.component.html'
})

export class TicketsListComponent implements OnInit {
    ticket: Ticket[] = [];
    statusFilter: string = 'alla';

    constructor(private ticketsServices: TicketsServices) {}

    ngOnInit(): void {
        this.ticketsServices.getTickets().subscribe({
            next: (data) => {
                console.log('Data', data);
                this.ticket = data.ticket;
            },
            error: (err) => console.error('Ticket data kunde inte hämtas:', err)
        })
    }
}