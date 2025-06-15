import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedMaterialModule } from '../../../models/disagn.modules';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, SharedMaterialModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  //Hanterar data från filter och hanterar den.
  @Input() label: string = 'filter';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'select' = 'text';
  @Input() options: {value: string, label: string} []=[];
  @Input() model: string = '';

  @Output() modelChange = new EventEmitter<string>();

  uppdateModul(value: string) {
    this.modelChange.emit(value);
  }
}
