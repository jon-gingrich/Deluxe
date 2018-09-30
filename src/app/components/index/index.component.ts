// index.component.ts

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Calculation } from '../../models/Calculation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  calculations: Observable<Calculation>;

  constructor(private store: Store) {
    this.calculations = this.store.select(state => state.calculations.calculations);
   }

  ngOnInit() {
  }

}