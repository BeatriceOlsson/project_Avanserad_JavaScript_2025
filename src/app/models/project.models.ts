import { Ticket } from "./task.models";

//Bluprint för hur project skall se ut.
export interface Project {
    id: number;
    name: string;
    description: string;
    deadline: number;
    tickets: Ticket[];
}

