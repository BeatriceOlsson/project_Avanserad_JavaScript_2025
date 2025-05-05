import { Ticket } from "./task.models";

export interface Project {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    tickets: Ticket[];
}

