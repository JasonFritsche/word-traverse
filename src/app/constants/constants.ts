import { IWordSearchOptions } from 'src/interfaces/words';

export const wordSearchOptions: IWordSearchOptions[] = [
  { name: 'Sounds Like', value: 'sl', resultTerm: 'words that sound like' },
  {
    name: 'Rhymes With',
    value: 'rel_rhy',
    resultTerm: 'words that rhyme with',
  },
  {
    name: 'Spelled Similarly To',
    value: 'sp',
    resultTerm: 'words that are spelled similarly to',
  },
  {
    name: 'Adjectives Used To Describe Your Search Term',
    value: 'rel_jjb',
    resultTerm: 'adjectives used to describe',
  },
  {
    name: 'Nouns That Are Described By Your Search Term',
    value: 'rel_jja',
    resultTerm: 'nouns that are described by',
  },
];
