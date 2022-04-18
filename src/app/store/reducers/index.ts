import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromWordSearch from './word-search.reducers';
import * as fromTheme from './theme.reducers';
import { wordSearchResults } from './word-search.reducers';
import { currentTheme } from './theme.reducers';

export interface State {
  wordSearch: fromWordSearch.IWordSearchState;
  currentTheme: fromTheme.IThemeState;
}

export const reducers: ActionReducerMap<State> = {
  wordSearch: fromWordSearch.wordSearchReducer,
  currentTheme: fromTheme.themeReducer,
};

export const getWordSearchState =
  createFeatureSelector<fromWordSearch.IWordSearchState>('wordSearch');

export const getThemeState =
  createFeatureSelector<fromTheme.IThemeState>('theme');

export const getWordSearchResults = createSelector(
  getWordSearchState,
  wordSearchResults
);

export const getTheme = createSelector(getThemeState, currentTheme);
