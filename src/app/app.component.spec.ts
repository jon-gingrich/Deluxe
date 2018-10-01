import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { MockComponent } from 'ng-mocks';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { IndexComponent } from './components/index/index.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
		MockComponent(CalculatorComponent),
		MockComponent(IndexComponent),
		
      ],
	  imports: [RouterTestingModule],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Accountant Calculator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Accountant Calculator');
  }));
});


