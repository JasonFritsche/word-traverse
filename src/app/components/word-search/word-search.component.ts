import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, retry, startWith, switchMap, tap } from "rxjs/operators";
import { ISearchCriteria, IWordSearchOptions, IWordSearchResult } from "../../../interfaces/words";
import { AppService } from "../../services/app.service";
import { HttpService } from "../../../services/http.service";
import { HighchartsService } from "src/services/highcharts.service";

@Component({
  selector: "app-word-search",
  templateUrl: "./word-search.component.html",
  styleUrls: ["./word-search.component.scss"],
})
export class WordSearchComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private appService: AppService,
    private highChartsService: HighchartsService
  ) {}

  searchIconRGB = "rgb(18, 48, 87)";
  searchSuggestions!: Observable<string[]>;

  wordSearchOptions: IWordSearchOptions[] = [
    { name: "Sounds Like", value: "sl" },
    { name: "Rhymes With", value: "rel_rhy" },
    { name: "Spelled Similarly To", value: "sp" },
    { name: "Adjectives Used To Describe Your Search Term", value: "rel_jjb" },
    { name: "Nouns That Are Described By Your Search Term", value: "rel_jja" },
  ];

  wordSearchForm = this.formBuilder.group({
    word: ["", Validators.required],
    searchOptions: [{ value: "", disabled: true }, Validators.required],
  });

  private formChanges$!: Subscription;

  ngOnInit() {
    this.handleSearchSuggestions();
    this.handleFormChanges();
  }

  ngOnDestroy() {
    if (this.formChanges$) this.formChanges$.unsubscribe();
  }

  onWordSearchFormSubmit() {
    // todo: we sometimes get an empty array, no results, how should that be handled? the word Testament is a good word to use for this case
    this.httpService.getSearchResults(this.wordSearchForm.value).subscribe((res: IWordSearchResult[]) => {
      this.highChartsService.setLatestWordSearchResults(res);
    });
  }

  private handleSearchSuggestions() {
    this.searchSuggestions = this.wordSearchForm.controls["word"].valueChanges.pipe(
      map((wordSearch: string) => wordSearch.trim()),
      debounceTime(250),
      distinctUntilChanged(),
      tap((searchTerm: string) => {
        this.searchIconRGB = this.appService.generateRGBColor();
        if (searchTerm !== "") {
          this.wordSearchForm.controls["searchOptions"].enable();
        } else {
          this.wordSearchForm.controls["searchOptions"].disable();
        }
      }),
      filter((wordSearch: string) => wordSearch !== ""),
      switchMap((wordSearch: string) =>
        this.httpService.getSuggestedWords(wordSearch).pipe(
          retry(3),
          startWith([]),
          map((resArr: IWordSearchResult[]) => resArr.map((res: IWordSearchResult) => res.word))
        )
      )
    );
  }

  private handleFormChanges() {
    this.formChanges$ = this.wordSearchForm.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe((change) => console.log(change));
  }
}
