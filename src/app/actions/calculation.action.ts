// calculation.action.ts

import { Calculation } from '../models/Calculation';

export class Compute {
    static readonly type = '[Calculation] Add';

    constructor(public payload: Calculation) {}
}