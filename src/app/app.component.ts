import { Component } from '@angular/core';
import { IHighchartsOptions } from 'src/interfaces/charts';
import {
  ISearchCriteria,
  IWordSearchOptions,
  IWordSearchResult,
} from 'src/interfaces/words';
import { HighchartsService } from 'src/services/highcharts.service';
import { HttpService } from 'src/services/http.service';
import { AppService } from './services/app.service';
import { wordSearchOptions } from './constants/constants';

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

  constructor(
    private appService: AppService,
    private highchartsService: HighchartsService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.highchartsService.chartOptions$.subscribe((options) => {
      this.showChart = true;
      this.chartOptions = options;
    });
  }

  handleLatestSearch(latestSearch: {
    word: string;
    searchOption: IWordSearchOptions;
  }) {
    const latestSearchCriteria: ISearchCriteria = {
      word: latestSearch.word,
      searchOptions: latestSearch.searchOption.name,
    };
    this.appService.nextLatestWordSearch(latestSearchCriteria);
    this.latestSearch = latestSearch;
  }

  handleBubbleClick(clickedBubbleWord: string) {
    // 1) get the latest word search from the app service
    const latestWordSearch = this.appService.latestWordSearch;
    // 2) create a new ISearchCriteria, set the clicked bubble word as the word, use the latestWordSearch searchOptions property as the searchOptions
    const newSearchCriteria: ISearchCriteria = {
      word: clickedBubbleWord,
      searchOptions: latestWordSearch.searchOptions,
    };
    // 3) set the newSearchCriteria in the app service
    this.appService.nextLatestWordSearch(newSearchCriteria);
    console.log(newSearchCriteria);
    // 4) find the correlating search option value in wordSearchOptions
    const currentWordOption = wordSearchOptions.find(
      (option) => option.name === newSearchCriteria.searchOptions
    );
    // 5) update the chart
    if (currentWordOption?.value) {
      this.httpService
        .getSearchResults({
          word: newSearchCriteria.word,
          searchOptions: currentWordOption?.value ?? '',
        })
        .subscribe((res: IWordSearchResult[]) => {
          this.highchartsService.setLatestWordSearchResults(res);
        });
      // 6) handle latest search
      this.handleLatestSearch({
        word: newSearchCriteria.word,
        searchOption: currentWordOption,
      });
    }
  }
}
