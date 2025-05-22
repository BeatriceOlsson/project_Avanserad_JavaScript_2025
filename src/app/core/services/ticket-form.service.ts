import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
            title: [ticket?.title || '', [Validators. required]],
            description: [ticket?.description || '', [Validators.required]],
            dudate: [ticket?.dudate || null, [Validators.required]],
            status: [ticket?.status || 'todo', [Validators.required]],
            priority: [ticket?.priority || 'green', [Validators.required]],
            completed: [ticket?.completed || 'no', [Validators.required]]
          });
    }
}