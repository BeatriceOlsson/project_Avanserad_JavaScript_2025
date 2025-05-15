import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../models/project.models';
import { ProjectsServices } from '../../../core/services/project.services';
import { ProjectFormComponent } from '../project-form/project-form.component';

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
    private fb: FormBuilder,
    private projectsServices: ProjectsServices
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.projectEdit.id],
      name: [this.projectEdit.name],
      description: [this.projectEdit.description],
      deadline: [new Date(this.projectEdit.deadline).toISOString().substring(0, 10)]
    });
  }

  saveProject(value: any): void {
    const uppdateProject: Project = {
      ...value,
      deadline: new Date(value.deadline).getTime(),
      tickets: this.projectEdit.tickets || []
    };

    this.projectsServices.uppdateProject(uppdateProject).subscribe(() => {
      console.log('Project uppdaterat: ', uppdateProject);
      this.editCompleted.emit();
    })
  }
}
