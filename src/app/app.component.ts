import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsListComponents } from './shared/components/ticket-list.component';
import { ProjectListComponents } from './shared/components/project-list.components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketsListComponents, ProjectListComponents],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'avanserad-javascript-projekt';
}
