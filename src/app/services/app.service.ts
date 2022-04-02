import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISearchCriteria } from 'src/interfaces/words';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  private readonly _latestWordSearch = new BehaviorSubject<ISearchCriteria>({
    word: '',
    searchOptions: '',
  });

  get latestWordSearch(): ISearchCriteria {
    return this._latestWordSearch.getValue();
  }

  private set latestWordSearch(value: ISearchCriteria) {
    this._latestWordSearch.next(value);
  }

  nextLatestWordSearch(value: ISearchCriteria) {
    this.latestWordSearch = value;
  }

  generateRGBColor() {
    const numba = () => Math.floor(Math.random() * 190) + 1;
    return `rgb(${numba()}, ${numba()}, ${numba()})`;
  }
}
