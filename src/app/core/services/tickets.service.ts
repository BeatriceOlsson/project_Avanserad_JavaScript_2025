import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, map, of } from "rxjs";
import { ticketEnvironment } from "../../../environments/ticket.environments";
import { Ticket } from "../../models/task.models";

interface TicketApi {
    ticket: Ticket[];
}
@Injectable ({ providedIn: 'root'})

export class TicketsServices {
    apiUrl = ticketEnvironment.apiUrl;

    constructor(private http: HttpClient) {}

    //Hämmta eller spara ticket i localStorage.
    private getLocalTickets(): Ticket[] {
        const data = localStorage.getItem('localTickets');
        return data ? (JSON.parse(data) as Ticket []) : [];
    }

    private saveLocalTickets(tickets: Ticket[]): void {
        localStorage.setItem('localTickets', JSON.stringify(tickets));
    }

    //Hemta datta för tickets från både DB och localStorage. Lösning då vi inte kan skicka API till DB för lagring eller uppdatering.
    getTickets(): Observable<Ticket[]> {
        return this.http.get<TicketApi>(this.apiUrl).pipe(
            map(response => {
                const apiTickets = response.ticket || [];
                const localTickets = this.getLocalTickets();
                return [...apiTickets, ...localTickets];
            }),

            catchError((error) => {
                console.log('Fel API: ', error);
                return of (this.getLocalTickets());
            })
        );
    }

    //Hantering av skappande av ny ticket, radera data och uppdatera datan av ticket.
    createTicket(ticket: Ticket): Observable<Ticket> {
        const localTickets = this.getLocalTickets();
        const maxId = localTickets.length ? Math.max(...localTickets.map(t => t.id ?? 0)): 0;
        const newTicket = {...ticket, id: maxId + 1};
        localTickets.push(newTicket);
        this.saveLocalTickets(localTickets);

        return of(newTicket);
    }

    deleteTicket(id: number): Observable<any> {
        const localTickets = this.getLocalTickets();
        const uppdateTickets = localTickets.filter(ticket => ticket.id !== id);
        this.saveLocalTickets(uppdateTickets);
    
        return of (true);
    }

    uppdateTicket(ticket: Ticket): Observable<Ticket> {
        const localTickets = this.getLocalTickets();
        const index = localTickets.findIndex(t => t.id === ticket.id);
        if (index !== -1) {
            localTickets[index] = ticket;
        }else {
            localTickets.push(ticket);
        }
    
        this.saveLocalTickets(localTickets);
    
        return of(ticket);
    }
}