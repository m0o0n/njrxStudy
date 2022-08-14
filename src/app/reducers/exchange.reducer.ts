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

export const ChangeBaseInputValue = createAction(
  '[Exchange] ChangeBaseInputValue',
  props<{ count: number }>()
);

export const ChangeToInputValue = createAction(
  '[Exchange] ChangeToInputValue',
  props<{ count: number }>()
);

export const ChangeExRate = createAction(
  '[Exchange] ChangeExRate',
  props<{ count: number }>()
);

export interface ValuesState {
  BaseValue: string;
  ToValue: string;
  BaseInputValue: number;
  ToInputValue: number;
  FromInTogle: boolean;
  ExRate: number;
  Amount: number;
}

export const initialState: ValuesState = {
  BaseValue: 'USD',
  ToValue: 'UAH',
  BaseInputValue: 1,
  ToInputValue: 1,
  FromInTogle: true,
  ExRate: 1,
  Amount: 1,
};

export const ValuesReducer = createReducer(
  initialState,
  on(ChangeBaseValue, (state, action) => ({
    ...state,
    BaseValue: action.value,
    Amount: 1,
  })),

  on(ChangeToValue, (state, action) => ({
    ...state,
    ToValue: action.value,
    Amount: 1,
  })),

  on(ChangeBaseInputValue, (state, action) => ({
    ...state,
    Amount: action.count,

    FromInTogle: true,
  })),

  on(ChangeToInputValue, (state, action) => ({
    ...state,
    Amount: action.count,
    FromInTogle: false,
  })),

  on(ChangeExRate, (state, action) => ({
    ...state,
    ExRate: action.count,
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

export const BaseInputValueSelector = createSelector(
  featureSelector,
  (state) => state.BaseInputValue
);

export const ToInputValueSelector = createSelector(
  featureSelector,
  (state) => state.ToInputValue
);

export const FromInTogleSelector = createSelector(
  featureSelector,
  (state) => state.FromInTogle
);

export const ExRateSelector = createSelector(
  featureSelector,
  (state) => state.ExRate
);
export const AmountSelector = createSelector(
  featureSelector,
  (state) => state.Amount
);
