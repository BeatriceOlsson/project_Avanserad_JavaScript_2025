import { Project } from "../models/project.models";

/*Skappad för att hantera data och omforma den för att pasa Projectets module*/ 
export function mapToProject( product: {
    id: number;
    title: string;
    description: string;
}): Project {
    return {
        id: product.id,
        name: product.title,
        description: product.description,
        deadline: new Date(),
        tickets: []
    };
}