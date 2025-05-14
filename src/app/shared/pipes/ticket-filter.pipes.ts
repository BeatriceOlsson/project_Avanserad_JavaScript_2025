import { Pipe, PipeTransform } from "@angular/core";
import { Ticket } from "../../models/task.models";


@Pipe({
    name: 'ticketFilter',
    standalone: true
})

export class TicketFilterPipe implements PipeTransform {
    transform(tickets: Ticket[], searchText: string ='', status: string = 'alla'): Ticket[] {
        if (!tickets) return [];

        return tickets.filter(ticket => {
            if (status === 'alla') return true;
            if (status === 'aktiva') return ticket.completed === 'no';
            if (status === 'klara') return ticket.completed === 'yes';
            return true;
        })
    }
}