// calculation.state.ts

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Calculation } from '../models/Calculation';
import { Compute } from '../actions/calculation.action';

export class CalcStateModel {
    calculations: Calculation[];
}

@State<CalcStateModel>({
    name: 'calculations',
    defaults: {
        calculations: []
    }
})
export class CalculatorState {

    @Selector()
    static getCalculations(state: CalcStateModel) {
        return state.calculations;
    }

    @Action(Compute)
    add({getState, patchState }: StateContext<CalcStateModel>, { payload }: Compute) {
        const state = getState();
        patchState({
            calculations: [...state.calculations, payload]
        });
    }
}