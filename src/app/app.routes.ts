import { Routes } from '@angular/router';
import { TicketsListComponent } from './shared/components/ticket-list/ticket-list.component';
import { ProjectsPageComponent } from './features/projects/projects.page/projects.page.component';
import { CreateNewProjectComponent } from './shared/components/create-new-project/create-new-project.component';


export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: 'projects', component: ProjectsPageComponent},
    {path: 'projects/create', component: CreateNewProjectComponent},
    {path: 'projects/:id', component: TicketsListComponent}
];
