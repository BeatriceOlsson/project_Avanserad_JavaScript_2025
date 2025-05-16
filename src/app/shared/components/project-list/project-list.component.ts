import { Component, OnInit } from "@angular/core";
import { Project } from "../../../models/project.models";
import { ProjectsServices } from "../../../core/services/project.services";
import { CommonModule } from "@angular/common";
import { EditProjectComponent } from "../edit-project/edit-project.component";
import { FormsModule } from "@angular/forms";
import { ProjectFilterPipe } from "../../pipes/project-filter.pipes";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from "../../../models/disagn.modules";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EditProjectComponent, ProjectFilterPipe, RouterModule, SharedMaterialModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  
  constructor( private projectService: ProjectsServices ) {}
  
  ngOnInit(): void {
    this.loadProjects();
  }
      
  searchProject: string ='';
  deadlineFilter?: string;
  
  loadProjects(): void {
    this.projectService.getAllProject().subscribe(projects => this.projects = projects);
    console.log('Här hämtas projecten: ', this.projects);
  }
  
  edit(project: Project) {
    this.selectedProject = {...project};
  }

  editCompleted(): void {
    this.selectedProject = null;
    this.loadProjects();
  }

  delete(id: number) {
    this.projectService.deleteProject(id).subscribe(() => this.loadProjects());
  }
}
