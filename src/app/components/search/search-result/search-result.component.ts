import { Component, Input, OnInit } from '@angular/core';
import { IWordSearchOptions } from 'src/interfaces/words';

@Component({
  selector: 'app-search-result',
  template: `
    <div class="flex flex-row justify-center p-8">
      <p>
        You searched for {{ latestSearch?.searchOption?.resultTerm }}
        {{ latestSearch?.word }}
      </p>
    </div>
  `,
})
export class SearchResultComponent implements OnInit {
  constructor() {}

  @Input() latestSearch!: { word: string; searchOption: IWordSearchOptions };

  ngOnInit(): void {}
}
