import { Pipe, PipeTransform } from "@angular/core";
import { Ticket } from "../../models/task.models";


@Pipe({
    name: 'ticketFilter',
    standalone: true
})

export class TicketFilterPipe implements PipeTransform {
    //Ger möjlighet att prioritera tickets baserat på färgen den har. Retunerar sifror och soterat baserat på sifrorna de tilldelats.
    private prioValue(priority: string): number {
        switch(priority?.toLowerCase()) {
            case 'red': return 3;
            case 'yellow': return 2;
            case 'green': return 1;
            default: return 0;
        }
    }

    sortByPriority(tickets: Ticket[]): Ticket[] {
        return tickets.sort((a, b) => this.prioValue(b.priority) - this.prioValue(a.priority));
    }

    transform(tickets: Ticket[], status: string = 'alla', searchTerm: string = '', sortByPriority: boolean = false): Ticket[] {
        //Kollar type på värdet som skickats.
        if (!Array.isArray(tickets)) {
            console.log('Ticket är inte en array.')
            return [];  
        } 

        const lowerCaseSeartch = searchTerm.toLowerCase()

        //Går igenom och retunerar de tickets som pasar in på filteringen om på status eller ord i titell eller biskrivning.
        const filterd = tickets.filter(ticket => {
            if (status !== 'alla') {
                if (status === 'aktiva') return ticket.completed === 'no';
                if (status === 'klara') return ticket.completed === 'yes';
                return false;
            }
            let searchPass = true;
            if (searchTerm) {
                searchPass = (ticket.title?.toLowerCase().includes(lowerCaseSeartch) ?? false) ||
                (ticket.description?.toLowerCase().includes(lowerCaseSeartch) ?? false);
            }
            return status && searchPass;
        });

        //Kallar på filtrering av sotering 
        if (sortByPriority){
            return this.sortByPriority(filterd);
        } else{
            return filterd;
        }
    }
}