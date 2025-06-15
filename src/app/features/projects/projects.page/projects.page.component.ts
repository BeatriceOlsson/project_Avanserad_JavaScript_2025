import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectListComponent } from '../../../shared/components/project-list/project-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, RouterModule],
  templateUrl: './projects.page.component.html',
  styleUrl: './projects.page.component.scss'
})

export class ProjectsPageComponent {

}
