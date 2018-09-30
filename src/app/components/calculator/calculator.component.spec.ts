import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { NgxsModule, Store } from '@ngxs/store';



describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let store: Store;
  let mockData = {calculationDisplay: "1 + 1", answer: "2"}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
	  imports: [
        NgxsModule.forRoot(),
		]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('store to be defined', async(() => { 
      expect(store).toBeDefined();
	}));
	
	it('last number should be removed from current number string', async(() => {
		
		component.currentValue = "12345";
		component.deleteNumber();
		
		expect(component.currentValue).toEqual("1234");
	}));
	
	it('addMemory should store currentValue', async(() => {
		
		component.currentValue = "12345";
		component.addMemory();		
		component.memoryRecall();
		
		expect(component.currentValue).toEqual("12345");
	}));	
	
	it('setOperand should set partial currentFormula for left value plus space and operand', async(() => {
		
		component.currentFormula = "12345";		
		component.setOperand("+");		
		
		expect(component.currentFormula).toEqual("12345 + ");
	}));
	
	
	it('alternateSign should flip sign on last number input', async(() => {
		
		component.currentValue = "1";		
		component.alternateSign();		
		
		expect(component.currentValue).toEqual("-1");
	}));
	
});
