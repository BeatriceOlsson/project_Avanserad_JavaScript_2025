import { ElementRef, Renderer2 } from '@angular/core';
import { PrioColorDirective } from './prio-color.directive';

describe('PrioColorDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    const renderMock = {
      setStyle: jasmine.createSpy('setStyle')
    } as unknown as Renderer2;
 
    const directive = new PrioColorDirective(elementRefMock, renderMock);
    expect(directive).toBeTruthy();
  });

  //Skrivet test för att se att fär röd sätts på prio röd.
  it('Kontrolera korect färg för prio röd', () => {
    const elementRefMock = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    const renderMock = {
      setStyle: jasmine.createSpy('setStyle')
    } as unknown as Renderer2;

    const direktiv = new PrioColorDirective(elementRefMock, renderMock);
    direktiv.appPrioColor = 'red';
    direktiv.ngOnChanges({ appPrioColor: {
      currentValue: 'red', previousValue: '', firstChange: true, isFirstChange: () => true
    }});

    expect(renderMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement, 'border', '0.5rem solid rgb(175, 62, 62)'
    );
  })
});
