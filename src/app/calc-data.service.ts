import { Injectable } from '@angular/core';
import { Calculation } from './models/Calculation';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CalcDataService {

  constructor() { }
  
  
  createCalc(leftVal: number, operator: string, rightVal: number){
	  
	var result;
 
	switch(operator) {
	 
	 case '/':
		if(rightVal === 0) {
			return "NaN";
		}		
	 case 'x':				
	 case '+': 		
	 case '-':
		result = eval(leftVal + operator + rightVal);
		break;	 
	default:
		throw new Error('Invalid operator provided');
	} 
 
	return result; 
  }
  
  
}
