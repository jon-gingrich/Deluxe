import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Compute } from '../../actions/calculation.action';
import {CalcDataService} from '../../calc-data.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalcDataService]
  
})
export class CalculatorComponent implements OnInit {

  constructor(private store: Store, private calcDataService: CalcDataService ) {
  }

  ngOnInit() {	
  
  }
  private leftValue: number;
  private rightValue: number;
  private memory: string;
  
  public currentValue = "";
  public operand = "";
  public currentFormula = "";
 
  public answer = "";  

  public setCurrent(value: string, clear: boolean = false) {	  
	  
	  if(clear) {
		this.currentValue = "";
		this.currentFormula = "";
	  }	  
	  this.currentValue = this.currentValue + value;
	  this.currentFormula = this.currentFormula + value;
  }
  
  public setOperand(value: string) {
	this.operand = value;
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
	this.setCurrent(this.memory);	
  }
  
  public deleteNumber() {
  
	this.setCurrent(this.currentValue.slice(0, -1), true);
  }
  
  public calculate() {
	this.rightValue = +this.currentValue;
	this.answer = this.calcDataService.createCalc(this.leftValue, this.operand, this.rightValue);
	this.store.dispatch(new Compute( {calculationDisplay: this.currentFormula, answer: this.answer}));
  }

  public alternateSign(){	  
	  this.currentValue = (+this.currentValue * -1).toString();
	  this.currentFormula = this.currentValue;
  }
  
  
  public reset() {
    this.currentValue = "";
	this.currentFormula = "";
	this.answer = "";
  }

}
