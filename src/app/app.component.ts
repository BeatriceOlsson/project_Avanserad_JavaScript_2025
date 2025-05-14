import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsListComponent } from './shared/components/ticket-list/ticket-list.component';
import { ProjectListComponent } from './shared/components/project-list/project-list.component';
import { CreateNewProjectComponent } from './shared/components/create-new-project/create-new-project.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketsListComponent, ProjectListComponent, CreateNewProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'avanserad-javascript-projekt';
}
