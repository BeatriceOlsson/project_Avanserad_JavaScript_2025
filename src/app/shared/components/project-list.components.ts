import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Project } from "../../models/project.models";
import { ProjectsServices } from "../../core/services/project.services";


@Component ({
    selector: 'app-project-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl:'./project-list.components.html'
})

export class ProjectListComponents implements OnInit {
    project: Project[] = [];

    constructor(private projectsServices: ProjectsServices) {}

    ngOnInit(): void {
        this.projectsServices.getAllProject().subscribe({
            next: (data) => {
                console.log('Project', data);
                this.project = data.projects;
            },
            error: (err) => console.error('projekt data kunde inte hämtas:', err)
        })
    }
}