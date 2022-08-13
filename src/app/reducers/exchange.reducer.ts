import { state } from '@angular/animations';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IData } from './data.model';
import { createAction, props } from '@ngrx/store';

export const ChangeBaseValue = createAction(
  '[Exchange] ChangeBaseValue',
  props<{ value: string }>()
);
export const ChangeToValue = createAction(
  '[Exchange] ChangeToValue',
  props<{ value: string }>()
);

export interface ValuesState {
  BaseValue: string;
  ToValue: string;
}

export const initialState: ValuesState = {
  BaseValue: 'USD',
  ToValue: 'UAH',
};

export const ValuesReducer = createReducer(
  initialState,
  on(ChangeBaseValue, (state, action) => ({
    ...state,
    BaseValue: action.value,
  })),

  on(ChangeToValue, (state, action) => ({
    ...state,
    ToValue: action.value,
  }))
);

// SELECTORS

export const featureSelector = createFeatureSelector<ValuesState>('values');

export const BaseValueSelector = createSelector(
  featureSelector,
  (state) => state.BaseValue
);

export const ToValueSelector = createSelector(
  featureSelector,
  (state) => state.ToValue
);
