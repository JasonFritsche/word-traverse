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
    const latestSearchCriteria: ISearchCriteria = {
      word: latestSearch.word,
      searchOptions: latestSearch.searchOption.value,
    };

    this.latestSearch = latestSearch; // todo: do we need this?
    this._store.dispatch(NewSearch({ payload: latestSearchCriteria }));
  }

  handleBubbleClick(clickedBubbleWord: string) {
    // 1) get the latest word search from the app service
    // todo: get the latest word search from state
    // const latestWordSearch = this.appService.latestWordSearch;
    // 2) create a new ISearchCriteria, set the clicked bubble word as the word, use the latestWordSearch searchOptions property as the searchOptions
    // const newSearchCriteria: ISearchCriteria = {
    //   word: clickedBubbleWord,
    //   searchOptions: latestWordSearch.searchOptions,
    // };
    // 3) set the newSearchCriteria in the app service
    // todo: dispatch action here

    // 4) find the correlating search option value in wordSearchOptions
    console.log(wordSearchOptions);
    const currentWordOption = wordSearchOptions.find(
      (option) => option.value === null // newSearchCriteria.searchOptions
    );
    // 5) update the chart
    if (currentWordOption?.value) {
      console.log('attempting to make getSearchResults call');
      // this.httpService
      //   .getSearchResults({
      //     word: newSearchCriteria.word,
      //     searchOptions: newSearchCriteria?.searchOptions ?? '',
      //   })
      //   .subscribe((res: IWordSearchResult[]) => {
      //     this.highchartsService.setLatestWordSearchResults(res);
      //   });
      // // 6) handle latest search
      // this.handleLatestSearch({
      //   word: newSearchCriteria.word,
      //   searchOption: currentWordOption,
      // });
    }
  }
}
