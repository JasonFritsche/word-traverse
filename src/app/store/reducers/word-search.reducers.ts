import { createReducer, on } from '@ngrx/store';
import { NewSearchSuccess } from '../actions/word-search.actions';

import { ISearchCriteria, IWordSearchResult } from 'src/interfaces/words';

export interface IWordSearchState {
  currentWordSearch: ISearchCriteria | null;
  wordSearches: ISearchCriteria[];
  wordSearchResults: IWordSearchResult[];
}

export const State: IWordSearchState = {
  currentWordSearch: null,
  wordSearches: [],
  wordSearchResults: [],
};

export const reducer = createReducer(
  State,
  on(NewSearchSuccess, (state, props) => ({
    ...state,
    wordSearchResults: props.payload,
  }))
);

export const wordSearchResults = (state: IWordSearchState) =>
  state.wordSearchResults;
