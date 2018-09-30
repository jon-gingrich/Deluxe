// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { IndexComponent } from './components/index/index.component';

import { CalculatorState } from './state/calculator.state';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
	IndexComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      CalculatorState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }