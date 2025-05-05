import { Ticket } from "../models/task.models";


export function mapToTicket( todo: {
    id: number;
    todo: string;
    completed: boolean; 
}): Ticket {
    return {
        id: todo.id,
        title: todo.todo,
        description:"",
        status: todo.completed ? 'todo' : 'done',
        priority: "yellow",
        dudate: new Date(),
        completed: todo.completed ? new Date() : new Date(0)
    };
}