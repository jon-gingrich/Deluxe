import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accountant', component: CalculatorComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

