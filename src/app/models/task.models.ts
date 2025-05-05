
export interface Ticket {
    id: number;
    title: string;
    description?:string;
    status: 'todo' | 'done';
    priority: 'rea' | 'yellow' | 'green'; 
    dudate: Date;
    completed: Date; 
}

