import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProjectsServices } from '../../../core/services/project.service';
import { Project } from '../../../models/project.models';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectFormService } from '../../../core/services/project-form.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-new-project',
  imports: [ReactiveFormsModule, ProjectFormComponent, RouterModule],
  templateUrl: './create-new-project.component.html',
  styleUrl: './create-new-project.component.scss'
})
export class CreateNewProjectComponent {
  form: FormGroup;

  //Tar in datan från project formulär, plaserar datan på represetive plats (id 0 är tillfäligt) och skickar för att sparas.
  constructor(
    private projectFormService: ProjectFormService,
    private projectService: ProjectsServices
  ){
    this.form = this.projectFormService.createProjectForm();
  }

  saveProject(value: any): void {
    const newProject: Project = {
      id: 0,
      name: value.name,
      description: value.description,
      deadline: new Date(value.deadline).getTime(),
      tickets: []
    };

    this.projectService.createProject(newProject).subscribe(()=> {
      this.form.reset();
    })

  }
}
