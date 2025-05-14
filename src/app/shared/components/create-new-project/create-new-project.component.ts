import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsServices } from '../../../core/services/project.services';
import { Project } from '../../../models/project.models';

@Component({
  selector: 'app-create-new-project',
  imports: [ReactiveFormsModule],
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

  saveProject(): void {
    const formValue = this.form.value;
    const newProject: Project = {
      id: 0,
      name: formValue.name,
      description: formValue.description,
      deadline: new Date(formValue.deadline).getTime(),
      tickets: []
    };
    this.projectService.createProject(newProject).subscribe(() => {
      console.log('Project spakades: ', newProject);
      this.form.reset();
    });
  }
}
