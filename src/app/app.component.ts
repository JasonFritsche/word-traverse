import { Component } from "@angular/core";
import { IHighchartsOptions } from "src/interfaces/charts";
import { IWordSearchOptions, IWordSearchResult } from "src/interfaces/words";
import { HighchartsService } from "src/services/highcharts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Word Traverse";
  showChart = false;
  chartOptions!: IHighchartsOptions;
  latestSearch!: { word: string; searchOption: IWordSearchOptions };

  constructor(private highchartsService: HighchartsService) {}

  ngOnInit() {
    this.highchartsService.chartOptions$.subscribe((options) => {
      this.showChart = true;
      this.chartOptions = options;
    });
  }

  handleLatestSearch(latestSearch: { word: string; searchOption: IWordSearchOptions }) {
    this.latestSearch = latestSearch;
  }
}
