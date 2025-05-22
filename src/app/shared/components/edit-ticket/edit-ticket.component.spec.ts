import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketComponent } from './edit-ticket.component';
import { TicketsServices } from '../../../core/services/tickets.service';
import { of } from 'rxjs';

class TicketServicesMock{
  uppdateTicket(){
    return of(null);
  }
}

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;
  let ticketsServices: TicketsServices;

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

  it('Anropar saveTicket för uppdatering', () => {
    spyOn(component.editCompleted, 'emit');

    const newValue = {id: 1, title: 'Ny Test ticket', description: 'Ny test ticket biskrivning',status: 'todo', priority: 'yellow',  dudate: 0, completed: 'no'}
    component.saveTicket(newValue);

    expect(component.editCompleted.emit).toHaveBeenCalled();
  })
});
