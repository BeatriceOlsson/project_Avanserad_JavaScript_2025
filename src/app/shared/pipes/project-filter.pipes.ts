import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../../models/project.models";


@Pipe({
    name: 'projectFilter',
    standalone: true
})

export class ProjectFilterPipe implements PipeTransform {
    transform(projects: Project[], seartText: string): Project[] {
        if (!projects || !seartText){
            return projects;
        }
        return projects.filter(project => project.name.toLowerCase().includes(seartText.toLowerCase()))
    }
}