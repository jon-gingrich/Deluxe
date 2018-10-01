import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Compute } from '../../actions/calculation.action';
import {CalcDataService} from '../../calc-data.service';
import { Observable } from 'rxjs';
import { Calculation } from '../../models/Calculation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalcDataService]
  
})
export class CalculatorComponent implements OnInit {

	calculations: Observable<Calculation>;

  constructor(private store: Store, private calcDataService: CalcDataService ) {
	  this.calculations = this.store.select(state => state.calculations.calculations);
  }

  ngOnInit() {	
  
  }
  
  
  
  private leftValue: number;
  private rightValue: number;
  private memory: string;
  
  public currentValue = "";
  public operator = "";
  public currentFormula = "";
 
  public answer = "";  

  public setCurrent(value: string, clear: boolean = false) {	  
	  
	  if(clear) {
		this.currentValue = "";
		this.currentFormula = "";
	  }	  
	  this.currentValue = this.currentValue + value;
	  this.currentFormula = this.currentFormula + value;
	  this.answer = "";
  }
  
  public setoperator(value: string) {
	this.operator = value;
	this.leftValue = +this.currentValue;
	this.currentValue = "";
	this.currentFormula = this.currentFormula + " " + value + " ";
  }
  
  public addMemory() {	  
	  this.memory = this.currentValue;
  }
  
  public removeMemory() {
	  this.memory = "";
  }
  
  public memoryRecall() {	
	  if(this.memory !== "") {
		this.setCurrent(this.memory, true);	
	  }
  }
  
  public deleteNumber() {
  
	this.setCurrent(this.currentValue.slice(0, -1), true);
  }
  
  public calculate() {
	this.rightValue = +this.currentValue;
	this.answer = this.calcDataService.createCalc(this.leftValue, this.operator, this.rightValue);	
	this.store.dispatch(new Compute( {calculationDisplay: this.currentFormula, answer: this.answer}));
	this.setCurrent(this.answer,true);	
  }

  public alternateSign(){	  
	if(this.operator !== "") {
		  this.currentFormula = this.currentFormula.slice(0, this.currentFormula.lastIndexOf(this.currentValue))
	  }
	  this.currentValue = (+this.currentValue * -1).toString();	  
	  this.currentFormula = this.currentFormula +  this.currentValue;
	  
  }
  
  
  public reset() {
    this.currentValue = "";
	this.currentFormula = "";
	this.answer = "";
  }

}
