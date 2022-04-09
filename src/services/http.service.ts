import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISearchCriteria, IWordSearchResult } from '../interfaces/words';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  private dmBaseUrl = 'https://api.datamuse.com';

  getSuggestedWords(searchTerm: string): Observable<IWordSearchResult[]> {
    return this.httpClient.get<IWordSearchResult[]>(
      `${this.dmBaseUrl}/sug?s=${searchTerm}`
    );
  }

  getSearchResults(searchCriteria: ISearchCriteria) {
    //todo: implement error handling
    const { searchOptions, word } = searchCriteria;
    return this.httpClient
      .get<IWordSearchResult[]>(
        `${this.dmBaseUrl}/words?${searchOptions}=${word}`
      )
      .pipe(
        map((res: IWordSearchResult[]) => res),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      );
  }
}
