import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../../models/disagn.modules';

@Component({
  selector: 'app-header',
  imports: [RouterModule, SharedMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
