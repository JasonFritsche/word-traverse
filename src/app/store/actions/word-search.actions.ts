import { createAction, props } from '@ngrx/store';

import { ISearchCriteria, IWordSearchResult } from 'src/interfaces/words';

export enum EWordSearchActions {
  NewSearch = '[WordSearch] New Search',
  NewSearchSuccess = '[WordSearch] New Search Success',
  NewSearchFailure = '[WordSearch] New Search Failure',
  GetPreviousSearch = '[WordSearch] Get Previous Search',
}

export const NewSearch = createAction(
  '[WordSearch] New Search',
  props<{ payload: ISearchCriteria }>()
);
export const NewSearchSuccess = createAction(
  '[WordSearch] New Search Success',
  props<{ payload: IWordSearchResult[] }>()
);
export const NewSearchFailure = createAction('[WordSearch] New Search Failure');
export const GetPreviousSearch = createAction(
  '[WordSearch] Get Previous Search'
);
