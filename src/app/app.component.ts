import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsListComponent } from './shared/components/ticket-list/ticket-list.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketsListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'avanserad-javascript-projekt';
}
