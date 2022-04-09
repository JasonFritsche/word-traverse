export interface IWordSearchResult {
  word: string;
  score: number;
}

export interface ISearchCriteria {
  word: string;
  searchOptions: string;
}

export interface IWordSearchOptions {
  name: string; // ex. 'Rhymes With'
  value: string; // ex. 'rel_rhy'
  resultTerm: string; // 'words that rhyme with'
}
