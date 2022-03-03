import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, retry, startWith, switchMap, tap } from "rxjs/operators";
import { ISearchCriteria, IWordSearchResult } from "../interfaces/words";
import { AppService } from "../services/app.service";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-word-search",
  templateUrl: "./word-search.component.html",
  styleUrls: ["./word-search.component.scss"],
})
export class WordSearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private appService: AppService) {}

  searchIconRGB = "rgb(18, 48, 87)";
  searchSuggestions!: Observable<string[]>;
  wordSearchOptions: ISearchCriteria[] = [
    { name: "Sounds Like", value: "sl" },
    { name: "Rhymes With", value: "rel_rhy" },
    { name: "Spelled Similarly To", value: "sp" },
    { name: "Adjectives Used To Describe Your Search Term", value: "rel_jjb" },
    { name: "Nouns That Are Described By Your Search Term", value: "rel_jja" },
  ];

  wordSearchForm = this.formBuilder.group({
    word: [""],
    criteria: [{ value: this.wordSearchOptions[1].value, disabled: true }],
  });

  ngOnInit(): void {
    this.searchSuggestions = this.wordSearchForm.controls["word"].valueChanges.pipe(
      map((wordSearch: string) => wordSearch.trim()),
      debounceTime(250),
      distinctUntilChanged(),
      tap((searchTerm: string) => {
        this.searchIconRGB = this.appService.generateRGBColor();
        if (searchTerm !== "") {
          this.wordSearchForm.controls["criteria"].enable();
        } else {
          this.wordSearchForm.controls["criteria"].disable();
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
}
