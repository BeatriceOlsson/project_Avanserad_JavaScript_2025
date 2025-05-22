
export interface Ticket {
    id: number;
    title: string;
    description?:string;
    status: 'todo' | 'done';
    priority: 'red' | 'yellow' | 'green'; 
    dudate: number;
    completed: 'yes' | 'no'; 
}

