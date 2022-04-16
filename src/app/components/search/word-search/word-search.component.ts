import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  retry,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  IWordSearchOptions,
  IWordSearchResult,
} from '../../../../interfaces/words';
import { AppService } from '../../../services/app.service';
import { HttpService } from '../../../../services/http.service';
import { wordSearchOptions } from '../../../constants/constants';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
})
export class WordSearchComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  @Output() latestSearch: EventEmitter<{
    word: string;
    searchOption: IWordSearchOptions;
  }> = new EventEmitter<{
    word: string;
    searchOption: IWordSearchOptions;
  }>();

  searchIconRGB = 'rgb(18, 48, 87)';
  searchSuggestions!: Observable<string[]>;
  showSearchSuggestions = false;
  wordSelectedFromResults = false;
  wordSearchOptions = wordSearchOptions;

  wordSearchForm = this.formBuilder.group({
    word: ['', Validators.required],
    searchOptions: [{ value: '', disabled: true }, Validators.required],
  });

  private formChanges$!: Subscription;

  ngOnInit() {
    this.handleSearchSuggestions();
  }

  ngOnDestroy() {
    if (this.formChanges$) this.formChanges$.unsubscribe();
  }

  onWordSearchFormSubmit(formDirective: FormGroupDirective) {
    // todo: we sometimes get an empty array, no results, how should that be handled? the word Testament is a good word to use for this case
    this.httpService
      .getSearchResults(this.wordSearchForm.value)
      .subscribe((res: IWordSearchResult[]) => {
        this.updateLatestSearch();
        this.resetForm(formDirective);
      });
  }

  selectSearchSuggestion(selectedWordSuggestion: string) {
    this.showSearchSuggestions = false;
    this.wordSearchForm.patchValue(
      {
        word: selectedWordSuggestion,
      },
      { emitEvent: false }
    );
  }

  private resetForm(formDirective: FormGroupDirective) {
    this.wordSearchForm.reset();
    // have to reset the formGroupDirective due to angular material: https://stackoverflow.com/questions/48216330/angular-5-formgroup-reset-doesnt-reset-validators
    formDirective.resetForm();
    this.wordSearchForm.controls['searchOptions'].disable();
  }

  private updateLatestSearch() {
    const { word, searchOptions } = this.wordSearchForm.value;
    const searchOption = wordSearchOptions.find(
      (option) => option.value === searchOptions
    );
    if (searchOption) {
      this.latestSearch.emit({ word, searchOption });
    }
  }

  private handleSearchSuggestions() {
    this.searchSuggestions = this.wordSearchForm.controls[
      'word'
    ].valueChanges.pipe(
      filter((res) => res !== null),
      map((wordSearch: string) => wordSearch.trim()),
      debounceTime(250),
      distinctUntilChanged(),
      tap((searchTerm: string) => {
        //this.searchIconRGB = this.appService.generateRGBColor();
        if (searchTerm !== '') {
          this.showSearchSuggestions = true;
          this.wordSearchForm.controls['searchOptions'].enable();
        } else {
          this.showSearchSuggestions = false;
          this.wordSearchForm.controls['searchOptions'].disable();
        }
      }),
      filter((wordSearch: string) => wordSearch !== ''),
      switchMap((wordSearch: string) =>
        this.httpService.getSuggestedWords(wordSearch).pipe(
          retry(3),
          startWith([]),
          tap((res) => console.log(res)),
          map((resArr: IWordSearchResult[]) =>
            resArr.map((res: IWordSearchResult) => res.word)
          )
        )
      )
    );
  }
}
