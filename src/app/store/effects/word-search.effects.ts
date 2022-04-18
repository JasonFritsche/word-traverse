import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, exhaustMap, map, catchError, tap } from 'rxjs/operators';

import { NewSearchSuccess } from '../actions/word-search.actions';
import { EWordSearchActions } from '../actions/word-search.actions';
import { HttpService } from 'src/services/http.service';
import { IWordSearchResult } from 'src/interfaces/words';

@Injectable()
export class WordSearchEffects {
  newSearch$ = createEffect(() =>
    this.actions.pipe(
      ofType(EWordSearchActions.NewSearch),
      exhaustMap((action: any) =>
        this.httpService.getSearchResults(action.payload).pipe(
          map((res: IWordSearchResult[]) => NewSearchSuccess({ payload: res })),
          catchError((error) => of(error))
        )
      )
    )
  );

  constructor(private actions: Actions, private httpService: HttpService) {}
}
