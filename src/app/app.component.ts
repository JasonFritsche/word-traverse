import { Component } from '@angular/core';
import { IHighchartsOptions } from 'src/interfaces/charts';
import {
  ISearchCriteria,
  IWordSearchOptions,
  IWordSearchResult,
} from 'src/interfaces/words';
import { HighchartsService } from 'src/services/highcharts.service';
import { select, Store } from '@ngrx/store';
import { IWordSearchState } from './store/reducers/word-search.reducers';
import { NewSearch } from './store/actions/word-search.actions';
import { getTheme, getWordSearchResults } from './store/reducers/index';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IThemeState } from './store/reducers/theme.reducers';
import { ITheme } from 'src/interfaces/theme';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="flex flex-col h-screen"
      [attr.data-theme]="selectedTheme?.value"
    >
      <header class="relative z-10 h-16">
        <app-navbar></app-navbar>
      </header>
      <main class="h-full">
        <div
          class="h-full grid grid-cols-[repeat(auto-fit,_minmax(24rem,_1fr))] gap-2"
        >
          <div class="h-full w-full">
            <ng-container *ngIf="showChart; else emptyState">
              <app-chart
                [theme]="selectedTheme"
                [options]="chartOptions"
                (onBubbleClick)="handleBubbleClick($event)"
              ></app-chart>
            </ng-container>
            <ng-template #emptyState>
              <app-empty-state>
                <p class="p-4">
                  Looks like there's nothing here. Make a search to get started!
                </p>
              </app-empty-state>
            </ng-template>
          </div>
          <div>
            <app-word-search
              (latestSearch)="handleLatestSearch($event)"
            ></app-word-search>
            <app-search-result
              *ngIf="latestSearch"
              [latestSearch]="latestSearch"
            ></app-search-result>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class AppComponent {
  title = 'Word Traverse';
  showChart = false;
  chartOptions!: IHighchartsOptions;
  latestSearch!: { word: string; searchOption: IWordSearchOptions };
  latestSearchCriteria!: ISearchCriteria;
  searchResults$!: Observable<IWordSearchResult[]>;
  selectedTheme: ITheme = {
    key: 'wt-theme-light',
    value: 'light',
    type: 'light',
    background: '#FFFFFF',
    secondary: '#37CDBE',
  };

  constructor(
    private highchartsService: HighchartsService,
    private wordSearchStore: Store<IWordSearchState>,
    private themeStore: Store<IThemeState>
  ) {}

  ngOnInit() {
    this.wordSearchStore
      .pipe(
        select(getWordSearchResults),
        filter((res) => !!res && res.length !== 0)
      )
      .subscribe((wordSearchRes) => {
        this.showChart = true;
        this.chartOptions = this.highchartsService.createOptions(wordSearchRes);
      });

    this.themeStore
      .select(getTheme)
      .subscribe((theme) => (this.selectedTheme = theme));
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
    this.wordSearchStore.dispatch(NewSearch({ payload: latestSearchCriteria }));
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

    this.wordSearchStore.dispatch(NewSearch({ payload: newSearchCriteria }));
  }
}
