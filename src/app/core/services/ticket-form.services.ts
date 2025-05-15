import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Ticket } from "../../models/task.models";


@Injectable({ 
    providedIn: 'root'
})

export class TicketFormService {
    constructor(
        private fb: FormBuilder
    ){}

    createTicketForm(ticket?: Ticket): FormGroup {
        return this.fb.group({
            id: [ticket?.id ],
            title: [ticket?.title],
            description: [ticket?.description],
            dudate: [ticket?.dudate ? new Date(ticket.dudate).toISOString().substring(0, 10): ''],
            status: [ticket?.status],
            priority: [ticket?.priority],
            completed: [ticket?.completed]
          });
    }
}