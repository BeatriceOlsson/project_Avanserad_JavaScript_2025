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

    getAllProject(): Observable<Project[]> {
        return this.http.get<{projects: Project[]}>(this.apiUrl).pipe(
            map(respons => {
                const apiProjects = respons.projects || [];
                const localProjects: Project[] = JSON.parse(localStorage.getItem('localProjects') || '[]');
                const combined = [...apiProjects, ...localProjects];

                console.log('API: ', apiProjects);
                console.log('LocalStorage: ', localProjects);
                console.log('Alla project. ', combined);
                return combined;
            }),
            catchError((error) => {
                console.log('Fel API: ', error);
                const localProjects: Project[] = JSON.parse(localStorage.getItem('localProjects') || '[]');
                return of ([]); //Kolla mer vad exakt denna funtionen gör och vad den behövs för de dubla minerna.
            })
        );
    }  

    createProject(project: Project): Observable<Project> {
        const localProjects: Project[] = JSON.parse(localStorage.getItem('localProjects') || '[]');
        const maxId = Math.max(0, ...localProjects.map( project => project.id || 0));
        const newProject = {...project, id: maxId + 1};
        localProjects.push(newProject);
        localStorage.setItem('localProjects', JSON.stringify(localProjects));

        return of(newProject);
    }

    deleteProject(id: number): Observable<any> {
        const localProjects: Project[] = JSON.parse(localStorage.getItem('localProjects') || '[]');
        const uppdateProject = localProjects.filter(project => project.id !== id);
        localStorage.setItem('localProjects', JSON.stringify(uppdateProject));

        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            catchError (error => {
                console.error('Error uppstog vid botagande av project: ', error);
                return of(null);
            })
        );
    }

    uppdateProject(project: Project): Observable<Project> {
        const localProjects: Project[] = JSON.parse(localStorage.getItem('localProjects') || '[]');
        const index = localProjects.findIndex(project => project.id === project.id);
        if (index !== -1) {
            localProjects[index] = project;
        }else {
            localProjects.push(project);
        }

        localStorage.setItem('localProjects', JSON.stringify(localProjects));

        return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project).pipe(
            catchError(error => {
                console.error('Error uppstog vid uppdatering av Project: ', error);
                return of(project);
            })
        )
    }
}