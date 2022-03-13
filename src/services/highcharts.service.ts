import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HichchartsOptions } from 'src/classes/chart';
import {
  IHighchartsOptions,
  IHighchartsPackedBubbleSeries,
} from 'src/interfaces/charts';
import { IWordSearchResult } from 'src/interfaces/words';

@Injectable({
  providedIn: 'root',
})
export class HighchartsService {
  constructor() {}

  private chartType = 'packedbubble';
  private readonly _wordSearchResults = new BehaviorSubject<
    IWordSearchResult[]
  >([]);
  private chartOptions = new ReplaySubject<IHighchartsOptions>();

  readonly wordSearchResult$ = this._wordSearchResults.asObservable();
  readonly chartOptions$ = this.chartOptions.asObservable();

  // returns the last value emitted in _wordSearchResults subject
  get wordSearchResults(): IWordSearchResult[] {
    return this._wordSearchResults.getValue();
  }

  // assigning a value to this.wordSearchResults will push it onto the observable ( and down to all of its subscribers)
  private set wordSearchResults(value: IWordSearchResult[]) {
    this._wordSearchResults.next(value);
  }

  createOptions() {
    const seriesData: IHighchartsPackedBubbleSeries = {
      data: this.wordSearchResults.map((searchRes) => {
        return { name: searchRes.word, value: searchRes.score };
      }),
    };
    const newPackedBubbleOptions = new HichchartsOptions(seriesData);
    this.chartOptions.next(newPackedBubbleOptions);
  }

  setLatestWordSearchResults(results: IWordSearchResult[]) {
    // currently only need to keep the latest results
    // if we need to keep a history, we could wire that up here
    this.wordSearchResults = results;
    this.createOptions();
  }
}
