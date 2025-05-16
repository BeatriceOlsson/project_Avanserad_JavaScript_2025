import { NgModule } from "@angular/core";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProjectFilterPipe } from "./pipes/project-filter.pipes";
import { TicketFilterPipe } from "./pipes/ticket-filter.pipes";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
    declarations: [ProjectListComponent, ProjectFilterPipe, TicketFilterPipe],
    imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    exports: [ ProjectListComponent, ProjectFilterPipe, TicketFilterPipe]
})

export class SharedModule{}