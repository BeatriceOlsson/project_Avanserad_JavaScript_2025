import { TicketsServices } from './tickets.service';

describe('TicketsService - getLocalTicket', () => {
  let service: TicketsServices;

  beforeEach(() => {
    service = new TicketsServices({} as any);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('få tom lista från loclalStorage', () => {
    const result = (service as any).getLocalTickets();
    expect(result).toEqual([]);
  });

  it('hämta ticket från localStorage', () => {
    const dummyTicket = [{id: 1, title: 'Test Ticket'}];
    localStorage.setItem('localTickets', JSON.stringify(dummyTicket));

    const result = (service as any).getLocalTickets();
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Test Ticket');
  })
});
