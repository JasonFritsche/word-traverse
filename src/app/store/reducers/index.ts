import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromWordSearch from './word-search.reducers';
import { wordSearchResults } from './word-search.reducers';

export interface State {
  wordSearch: fromWordSearch.IWordSearchState;
}

export const reducers: ActionReducerMap<State> = {
  wordSearch: fromWordSearch.reducer,
};

export const getWordSearchState =
  createFeatureSelector<fromWordSearch.IWordSearchState>('state');

export const getWordSearchResults = createSelector(
  getWordSearchState,
  wordSearchResults
);
