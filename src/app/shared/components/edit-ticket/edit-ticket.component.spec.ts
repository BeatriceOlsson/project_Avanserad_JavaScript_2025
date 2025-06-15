import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketComponent } from './edit-ticket.component';
import { TicketsServices } from '../../../core/services/tickets.service';
import { of } from 'rxjs';

//Mock miljö som mockar ett API anrop.
class TicketServicesMock{
  uppdateTicket(){
    return of(null);
  }
}

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;
  let ticketsServices: TicketsServices;

  //Förbereder för testet med att skappa test miljö, skappa manuelt ticket och spionera på att skappande av ticket fungerar koreckt.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTicketComponent],
      providers: [{ provide: TicketsServices, useClass: TicketServicesMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTicketComponent);
    component = fixture.componentInstance;
    component.ticketEdit = { id: 1, title: 'Test ticket', description: 'test ticket biskrivning',status: 'todo', priority: 'red',  dudate: 0, completed: 'no'};
    fixture.detectChanges();
    ticketsServices = TestBed.inject(TicketsServices);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Utför test för att säckerstäla att anropet gjorts och svar skickats tillbacka från saveTicket.
  it('Anropar saveTicket för uppdatering', () => {
    spyOn(component.editCompleted, 'emit');

    const newValue = {id: 1, title: 'Ny Test ticket', description: 'Ny test ticket biskrivning',status: 'todo', priority: 'yellow',  dudate: 0, completed: 'no'}
    component.saveTicket(newValue);

    expect(component.editCompleted.emit).toHaveBeenCalled();
  })
});
