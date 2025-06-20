import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListComponent } from './ticket-list.component';

describe('TicketListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
