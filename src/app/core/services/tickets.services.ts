import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ticketEnvironment } from "../../../environments/ticket.environments";


@Injectable ({ providedIn: 'root'})

export class TicketsServices {
    apiUrl = ticketEnvironment.apiUrl;

    constructor(private http: HttpClient) {}

    getTickets(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            catchError((error) => {
                console.log('Fel API: ', error);
                throw new Error('Fel uppstog vis API anrop av Ticket');
            })
        )
    }
}