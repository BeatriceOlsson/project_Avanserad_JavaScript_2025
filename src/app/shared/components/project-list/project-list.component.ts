import { Component, inject } from "@angular/core";
import { Project } from "../../../models/project.models";
import { ProjectsServices } from "../../../core/services/project.service";
import { CommonModule } from "@angular/common";
import { EditProjectComponent } from "../edit-project/edit-project.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from "../../../models/disagn.modules";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProjectFilterPipe } from "../../pipes/project-filter.pipes";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EditProjectComponent, RouterModule, SharedMaterialModule, ProjectFilterPipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  selectedProject: Project | null = null;
  searchProject: string ='';
  deadlineFilter?: string;

  private projectServise = inject(ProjectsServices);

  projects = toSignal(this.projectServise.getAllProject(), {
    initialValue: []
  });
  
  constructor( private projectService: ProjectsServices ) {}
  
  //Anroppar konstruktor när användaren väljer att uppdatera eller radera project.
  edit(project: Project) {
    this.selectedProject = {...project};
  }

  editCompleted(): void {
    this.selectedProject = null;
    this.projects = toSignal(this.projectService.getAllProject(), {initialValue: []});
  }

  delete(id: number) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = toSignal(this.projectService.getAllProject(), {initialValue: []});
    });
  }
}
