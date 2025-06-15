import { TestBed } from '@angular/core/testing';
import { ProjectsServices } from './project.service';
import { provideHttpClientTesting } from  '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProjectsServices', () => {
  let service: ProjectsServices;

  //Tästar att skappa ett nyt project med TestBed där localStorage rensas, ett project skappas sen testas det att projectets har skappats korect.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsServices, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProjectsServices);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    describe('Skappa nytt project', () => {
      it('Skappa project i localStorage', () => {
        const project = {id: 0, name: 'Test project', description: 'Test project', deadline: 0, tickets: []};
        service.createProject(project).subscribe(nyttProject => {
          expect(nyttProject.id).toBe(1);
          expect(nyttProject.name).toBe('Test project');
          const data = localStorage.getItem('localProjects');
          const sparadeLocalaProejct = data ? JSON.parse(data) : [];
          expect(sparadeLocalaProejct.length).toBe(1);
          expect(sparadeLocalaProejct[0].name).toBe('Test project');
        })
      })
    })

});
