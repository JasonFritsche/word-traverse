import { Component } from '@angular/core';
import { IHighchartsOptions } from 'src/interfaces/charts';
import {
  ISearchCriteria,
  IWordSearchOptions,
  IWordSearchResult,
} from 'src/interfaces/words';
import { HighchartsService } from 'src/services/highcharts.service';
import { wordSearchOptions } from './constants/constants';
import { select, Store } from '@ngrx/store';
import { IWordSearchState } from './store/reducers/word-search.reducers';
import { NewSearch } from './store/actions/word-search.actions';
import { getWordSearchResults } from './store/reducers/index';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Word Traverse';
  showChart = false;
  chartOptions!: IHighchartsOptions;
  latestSearch!: { word: string; searchOption: IWordSearchOptions };
  latestSearchCriteria!: ISearchCriteria;
  searchResults$!: Observable<IWordSearchResult[]>;

  constructor(
    private highchartsService: HighchartsService,
    private _store: Store<IWordSearchState>
  ) {}

  ngOnInit() {
    this._store
      .pipe(
        select(getWordSearchResults),
        filter((res) => !!res && res.length !== 0)
      )
      .subscribe((wordSearchRes) => {
        this.showChart = true;
        this.chartOptions = this.highchartsService.createOptions(wordSearchRes);
      });
  }

  handleLatestSearch(latestSearch: {
    word: string;
    searchOption: IWordSearchOptions;
  }) {
    this.latestSearch = latestSearch;
    const latestSearchCriteria: ISearchCriteria = {
      word: latestSearch.word,
      searchOptions: latestSearch.searchOption.value,
    };

    this.latestSearchCriteria = latestSearchCriteria;
    this._store.dispatch(NewSearch({ payload: latestSearchCriteria }));
  }

  handleBubbleClick(clickedBubbleWord: string) {
    const newSearchCriteria: ISearchCriteria = {
      word: clickedBubbleWord,
      searchOptions: this.latestSearchCriteria.searchOptions,
    };

    this.latestSearch = {
      ...this.latestSearch,
      word: clickedBubbleWord,
    };

    this._store.dispatch(NewSearch({ payload: newSearchCriteria }));
  }
}
