import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, retry, startWith, switchMap, tap } from "rxjs/operators";
import { IWordSearchResult } from "../interfaces/words";
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

  wordSearchForm = this.formBuilder.group({
    word: [""],
    criteria: [""],
  });

  ngOnInit(): void {
    this.searchSuggestions = this.wordSearchForm.controls["word"].valueChanges.pipe(
      map((wordSearch: string) => wordSearch.trim()),
      debounceTime(250),
      distinctUntilChanged(),
      tap(() => (this.searchIconRGB = this.appService.generateRGBColor())),
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
