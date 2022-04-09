import { Action, createAction, props } from '@ngrx/store';

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

// export class NewSearch implements Action {
//   public readonly type = EWordSearchActions.NewSearch;
//   constructor(public payload: ISearchCriteria) {}
// }

// export class NewSearchSuccess implements Action {
//   public readonly type = EWordSearchActions.NewSearchSuccess;
//   constructor(public payload: IWordSearchResult[]) {
//     console.log(payload);
//   }
// }

// export class NewSearchFailure implements NewSearchFailure {
//   public readonly type = EWordSearchActions.NewSearch;
// }

// export class GetPreviousSearch implements Action {
//   public readonly type = EWordSearchActions.GetPreviousSearch;
// }

// export type wordSearchActions =
//   | NewSearch
//   | NewSearchSuccess
//   | NewSearchFailure
//   | GetPreviousSearch;
