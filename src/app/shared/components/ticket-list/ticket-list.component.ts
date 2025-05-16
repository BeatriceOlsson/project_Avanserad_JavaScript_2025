import { Component, OnInit } from "@angular/core";
import { Ticket } from "../../../models/task.models";
import { TicketsServices } from "../../../core/services/tickets.services";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TicketFilterPipe } from "../../pipes/ticket-filter.pipes";
import { EditTicketComponent } from "../edit-ticket/edit-ticket.component";
import { CreateNewTicketComponent } from "../create-new-ticket/create-new-ticket.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SharedMaterialModule } from "../../../models/disagn.modules";



@Component ({
    selector: 'app-ticket-list',
    standalone: true,
    imports: [CommonModule, FormsModule, TicketFilterPipe, EditTicketComponent, CreateNewTicketComponent, RouterModule,SharedMaterialModule],
    templateUrl: './ticket-list.component.html'
})

export class TicketsListComponent implements OnInit {
    ticket: Ticket[] = [];
    statusFilter: string = 'alla';
    selectedTickets: Ticket | null = null;
    projectID: number | null = null;

    constructor(
        private ticketsServices: TicketsServices,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(param => {
            const id = param.get('id');
            this.projectID = id !== null ? parseInt(id, 10) : null
        });
        this.loadTickets();
    }

    loadTickets(): void {
        this.ticketsServices.getTickets().subscribe({
            next: (data) => {
                console.log('Data', data);
                this.ticket = data;
            },
            error: (err) => console.error('Ticket data kunde inte hämtas:', err)
        });
    }

    edit(ticket: Ticket): void {
        this.selectedTickets = ticket;
    }

    handelEditComplete(): void {
        this.selectedTickets = null;
        this.loadTickets();
    }

    delete(id: number): void {
        this.ticketsServices.deleteTicket(id).subscribe(() => {
            this.loadTickets();
        });
    }

    handelTicketAdded(): void {
        this.loadTickets();
    }
}