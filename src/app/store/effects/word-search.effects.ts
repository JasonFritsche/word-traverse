import { Inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import {
  switchMap,
  exhaustMap,
  withLatestFrom,
  map,
  catchError,
  tap,
} from 'rxjs/operators';

import { IWordSearchState } from '../reducers/word-search.reducers';

import {
  NewSearch,
  NewSearchSuccess,
  NewSearchFailure,
  GetPreviousSearch,
} from '../actions/word-search.actions';
import { EWordSearchActions } from '../actions/word-search.actions';
import { HttpService } from 'src/services/http.service';
import { ISearchCriteria, IWordSearchResult } from 'src/interfaces/words';

@Injectable()
export class WordSearchEffects {
  newSearch$ = createEffect(() =>
    this.actions.pipe(
      tap((action) => console.log(action)),
      ofType(EWordSearchActions.NewSearch),
      exhaustMap((action: any) =>
        this.httpService.getSearchResults(action.payload).pipe(
          map((res: IWordSearchResult[]) => NewSearchSuccess({ payload: res })),
          catchError((error) => of(error))
        )
      )
    )
  );

  // switchMap((criteria: ISearchCriteria) => {
  //   return this.httpService.getSearchResults(criteria).pipe(
  //     map((res) => new NewSearchSuccess(res)),
  //     catchError((error) => of(error))
  //   );
  // })

  constructor(
    private actions: Actions,
    private store: Store<IWordSearchState>,
    private httpService: HttpService
  ) {}
}
