import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Compute } from '../../actions/calculation.action';
import {CalcDataService} from '../../calc-data.service';
import { Observable } from 'rxjs';
import { Calculation } from '../../models/Calculation';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalcDataService]
  
})
export class CalculatorComponent implements OnInit {
	
	// Bind keypress to use numerical keypad
	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
    if(Number(event.key)) { 
			this.setCurrent(event.key);
		}		
	else if(event.keyCode === 13 ) { 
			this.calculate();
		}
	// See if one of the keys is accepted operator
	else if( [42,43,45,47].indexOf(event.keyCode) > -1){ 
		this.setOperator(event.key);
	}
  }

	// Use ngxs datastore to manage state
	calculations: Observable<Calculation>;

  constructor(private store: Store, private calcDataService: CalcDataService ) {
	  
	  // Assign the calculation done by the user to the calculations collection
	  // to bve displayed in history.
	  this.calculations = this.store.select(state => state.calculations.calculations);
  }

  ngOnInit() {	
  
  }
  
  // Number on left side of operator  
  private leftValue: number;
  
  // Number on right side of operator 
  private rightValue: number;
  
  // Store number saved for memory 
  private memory: string;
  
  //Collect current number being entered in to calculator
  public currentValue = "";
  
  // Operator user has chosen
  public operator = "";
  
  // Current equation for display purposes
  public currentFormula = "";
 
  public answer = "";  

  
  // Updates the current value as it is entered in the calculator
  // Upsates the currentForumla based on currentValue
  public setCurrent(value: string, clear: boolean = false) {	  
	  
	  if(clear) {
		this.currentValue = "";
		this.currentFormula = "";
	  }	  
	  this.currentValue = this.currentValue + value;
	  this.currentFormula = this.currentFormula + value;
	  this.answer = "";
  }
  
  
  // Sets the operator chosen, will reset currentValue to start capturing other entry after
  // Updates currentFormula to show the added operator
  public setOperator(value: string) {
	this.operator = value;
	this.leftValue = +this.currentValue;
	this.currentValue = "";
	this.currentFormula = this.currentFormula + " " + value + " ";
  }
  
  // Sets number to memory
  public addMemory() {	  
	  this.memory = this.currentValue;
  }
  
  // Erase the currently stored value
  public removeMemory() {
	  this.memory = "";
  }
  
  // Set current value to number stored in memory if not blank
  public memoryRecall() {	
	  if(this.memory !== "") {
		this.setCurrent(this.memory, true);	
	  }
  }
  
  // Allows user to delete the last individial number the entered in the stream
  public deleteNumber() {
  
	this.setCurrent(this.currentValue.slice(0, -1), true);
  }
  
  // Does the calculations when the user hits '=' sign
  public calculate() {
	this.rightValue = +this.currentValue;
	this.answer = this.calcDataService.createCalc(this.leftValue, this.operator, this.rightValue);	
	this.store.dispatch(new Compute( {calculationDisplay: this.currentFormula, answer: this.answer}));
	this.setCurrent(this.answer,true);	
  }

  // Alternates the sign of the last full number entered (left or right side)
  public alternateSign(){	  
	if(this.operator !== "") {
		  this.currentFormula = this.currentFormula.slice(0, this.currentFormula.lastIndexOf(this.currentValue))
	  }
	  this.currentValue = (+this.currentValue * -1).toString();	  
	  this.currentFormula = this.currentFormula +  this.currentValue;
	  
  }
  
  // Resets the calculator so brand new information can be entered
  public reset() {
    this.currentValue = "";
	this.currentFormula = "";
	this.answer = "";
  }
}
