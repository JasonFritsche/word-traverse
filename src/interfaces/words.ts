export interface IWordSearchResult {
  word: string;
  score: number;
}

export interface IWordSearchOptions {
  value: string;
  name: string;
  resultTerm: string;
}

export interface ISearchCriteria {
  word: string;
  searchOptions: string;
}
