import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { IData } from './data.model';

export const selectData = createFeatureSelector<ReadonlyArray<IData>>('data');

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('colection');
export const selectBookCollection = createSelector(
  selectData,
  selectCollectionState,
  (data, collection) => {
    return collection.map((id) => data.find((data) => data));
  }
);
