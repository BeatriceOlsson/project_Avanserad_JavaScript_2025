import { NgModule } from "@angular/core";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { CommonModule } from "@angular/common";
import { DateFixToUnix } from "./pipes/date-fix-to-unix.pipe";
import { FormsModule } from "@angular/forms";
import { ProjectFilterPipe } from "./pipes/project-filter.pipes";
import { TicketFilterPipe } from "./pipes/ticket-filter.pipes";

@NgModule({
    declarations: [ProjectListComponent, DateFixToUnix, ProjectFilterPipe, TicketFilterPipe],
    imports: [CommonModule, FormsModule],
    exports: [ DateFixToUnix, ProjectListComponent, ProjectFilterPipe, TicketFilterPipe]
})

export class SharedModule{}