import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { projectEnvironment } from "../../../environments/project.environments";


@Injectable({
    providedIn: 'root'
})

export class ProjectsServices {
    private apiUrl = projectEnvironment.apiUrl;

    constructor (private http: HttpClient) {}

    getAllProject(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            catchError((error) => {
                console.log('Fel API: ', error);
                throw new Error('Fel uppstog vid API anrop av Projekt');
            })
        )
    }
}