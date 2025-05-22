import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormService {
  constructor(private fb: FormBuilder) { }

  createProjectForm(project?: Project): FormGroup {
    return this.fb.group({
      id: [project?.id],
      name: [project?.name || '', [Validators.required]],
      description: [project?.description || '', [Validators.required]],
      deadline: [project?.deadline || null, [Validators.required]]
    });
  }
}
