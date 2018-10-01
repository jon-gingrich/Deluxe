import { TestBed } from '@angular/core/testing';

import { CalcDataService } from './calc-data.service';

describe('CalcDataService', () => {
	let service: CalcDataService;
	
  beforeEach(() => TestBed.configureTestingModule({}));

  
  
beforeEach(() => {
    service = new CalcDataService()
  });
  it('should be created', () => {
    const service: CalcDataService = TestBed.get(CalcDataService);
    expect(service).toBeTruthy();
  });
  
  it('createCalc should return correct answer for calculation', () => {
	  
	  var leftHand = 5;
	  var operator = "+";
	  var rightHand = 10;
	  
    expect(service.createCalc(leftHand,operator,rightHand)).toEqual(15);
  });
  
  
  it('createCalc handle divide by 0', () => {
	  
	  var leftHand = 5;
	  var operator = "/";
	  var rightHand = 0;
	  
    expect(service.createCalc(leftHand,operator,rightHand)).toEqual("NaN");
  });
  
  it('createCalc should throw exception for invalid equation', () => {
	  
	  var leftHand = 5;
	  var operator = "%";
	  var rightHand = 0;
	  
    expect(function(){service.createCalc(leftHand,operator,rightHand)}).toThrow(new Error('Invalid operator provided'));
  });
  
  
});
