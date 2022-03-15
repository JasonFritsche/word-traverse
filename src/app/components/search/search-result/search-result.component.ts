import { Component, Input, OnInit } from "@angular/core";
import { IWordSearchOptions } from "src/interfaces/words";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"],
})
export class SearchResultComponent implements OnInit {
  constructor() {}

  @Input() latestSearch!: { word: string; searchOption: IWordSearchOptions };

  ngOnInit(): void {}
}
