import { Component } from '@angular/core';
import {CalcDataService} from './calc-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalcDataService]
})
export class AppComponent {
  title = 'Accountant Calculator';
  
  constructor(private calcDataService: CalcDataService) {
  }
}
