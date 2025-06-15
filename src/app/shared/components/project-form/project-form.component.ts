import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../models/disagn.modules';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedMaterialModule, SharedMaterialModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Input() form!: FormGroup;
  @Input() submitLabel: string = 'Spara';
  @Output() submitted = new EventEmitter<any>();

  //Kontrolerar att uppdatering från form stämer överens med typografin som project har.
  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}