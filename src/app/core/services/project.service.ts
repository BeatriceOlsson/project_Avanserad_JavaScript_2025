import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, map } from "rxjs";
import { projectEnvironment } from "../../../environments/project.environments";
import { Project } from "../../models/project.models";


@Injectable({
    providedIn: 'root'
})

export class ProjectsServices {
    private apiUrl = projectEnvironment.apiUrl;

    constructor ( private http: HttpClient) {}

    //Hämmta eller spara project i localStorage.
    private getLocalprojects(): Project[] {
        const data = localStorage.getItem('localProjects');
        return data ? JSON.parse(data) : [];
    }

    private saveLocalProjects(projects: Project[]): void {
        localStorage.setItem('localProjects', JSON.stringify(projects));
    }

    //Hemta datta för project från både DB och localStorage. Lösning då vi inte kan skicka API till DB för lagring eller uppdatering.
    getAllProject(): Observable<Project[]> {
        return this.http.get<{projects: Project[]}>(this.apiUrl).pipe(
            map(respons => {
                const apiProjects = respons.projects || [];
                const localProjects = this.getLocalprojects();
                const combined = [...apiProjects, ...localProjects];

                return combined;
            }),
            
            catchError((error) => {
                console.log('Fel API: ', error);
                return of (this.getLocalprojects()); 
            })
        );
    }  

    //Hantering av skappande av ny project, radera data och uppdatera datan av project.
    createProject(project: Project): Observable<Project> {
        const localProjects = this.getLocalprojects();
        const maxId = localProjects.length ? Math.max(...localProjects.map(p => p.id ?? 0)): 0;
        const newProject = {...project, id: maxId + 1};
        localProjects.push(newProject);
        this.saveLocalProjects(localProjects);

        return of(newProject);
    }

    deleteProject(id: number): Observable<any> {
        const localProjects = this.getLocalprojects();
        const uppdateProject = localProjects.filter(project => project.id !== id);
        this.saveLocalProjects(uppdateProject);

        return of(null);
    }

    uppdateProject(project: Project): Observable<Project> {
        const localProjects = this.getLocalprojects();
        const index = localProjects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            localProjects[index] = project;
        }else {
            localProjects.push(project);
        }

        this.saveLocalProjects(localProjects);

        return of(project);
    }
}
