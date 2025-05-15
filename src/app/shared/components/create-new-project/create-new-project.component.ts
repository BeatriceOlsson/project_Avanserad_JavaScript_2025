import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsServices } from '../../../core/services/project.services';
import { Project } from '../../../models/project.models';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-create-new-project',
  imports: [ReactiveFormsModule, ProjectFormComponent],
  templateUrl: './create-new-project.component.html',
  styleUrl: './create-new-project.component.scss'
})
export class CreateNewProjectComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsServices
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required]
    });
  }

  saveProject(value: any): void {
    const newProject: Project = {
      id: 0,
      name: value.name,
      description: value.description,
      deadline: new Date(value.deadline).getTime(),
      tickets: []
    };
    this.projectService.createProject(newProject).subscribe(() => {
      console.log('Project spakades: ', newProject);
      this.form.reset();
    });
  }
}
