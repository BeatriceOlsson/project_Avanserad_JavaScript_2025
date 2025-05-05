import { Ticket } from "./task.models";

export interface Project {
    id: number;
    name: string;
    description: string;
    deadline: number;
    tickets: Ticket[];
}

