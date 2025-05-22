import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../models/project.models';
import { ProjectsServices } from '../../../core/services/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectFormService } from '../../../core/services/project-form.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProjectFormComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  @Input() projectEdit!: Project;
  @Output() editCompleted = new EventEmitter<void>();
  form!: FormGroup;

  constructor(
    private projectsServices: ProjectsServices,
    private projectFromServices: ProjectFormService
  ) {}

  ngOnInit(): void {
    this.form = this.projectFromServices.createProjectForm(this.projectEdit);
  }

  saveProject(value: any): void {
    const uppdateProject: Project = {
      ...value,
      deadline: new Date(value.deadline).getTime(),
      tickets: this.projectEdit.tickets || []
    };
    this.projectsServices.uppdateProject(uppdateProject).subscribe(() => {
      this.editCompleted.emit();
    })
  }
}
