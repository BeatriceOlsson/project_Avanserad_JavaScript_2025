import { Component, OnInit } from "@angular/core";
import { Ticket } from "../../models/task.models";
import { TicketsServices } from "../../core/services/tickets.services";
import { CommonModule } from "@angular/common";
import { mapToTicket } from "../ticket.mapper";


@Component ({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ticket-list.component.html'
})

export class TicketsListComponents implements OnInit {
    ticket: Ticket[] = [];

    constructor(private ticketsServices: TicketsServices) {}

    ngOnInit(): void {
        this.ticketsServices.getTickets().subscribe({
            next: (data) => {
                console.log('Data', data);
                this.ticket = data.todos.map(mapToTicket);
            },
            error: (err) => console.error('Ticket data kunde inte hämtas:', err)
        })
    }
}