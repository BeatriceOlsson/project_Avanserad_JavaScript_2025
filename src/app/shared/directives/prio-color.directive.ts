import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChange, SimpleChanges, Component } from '@angular/core';

@Directive({
  selector: '[appPrioColor]'
})

export class PrioColorDirective implements OnChanges {
  @Input() appPrioColor: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2 ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appPrioColor']) {
      this.setColor(this.appPrioColor);
    }
  }
  private setColor(priority: string) {
    let color= '' ;

    switch (priority) {
      case 'red':
        color = 'rgb(175, 62, 62)';
        break;
      case 'yellow':
        color = 'rgb(250, 237, 202)';
        break;
      case 'green':
        color = 'rgb(193, 219, 179)'
        break;
      default:
        color = 'rgb(234, 228, 213)';
    }
    this.renderer.setStyle(this.element.nativeElement, 'border', `0.5rem solid ${color}`);

  }
}
