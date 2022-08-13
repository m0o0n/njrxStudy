import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { ValuesReducer, ValuesState } from './exchange.reducer';

export interface State {
  values: ValuesState;
}

export const reducers: ActionReducerMap<State> = {
  values: ValuesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
