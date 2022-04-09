import { Injectable } from '@angular/core';
import { HichchartsOptions } from 'src/classes/chart';
import { IHighchartsPackedBubbleSeries } from 'src/interfaces/charts';
import { IWordSearchResult } from 'src/interfaces/words';

@Injectable({
  providedIn: 'root',
})
export class HighchartsService {
  constructor() {}

  createOptions(results: IWordSearchResult[]) {
    const seriesData: IHighchartsPackedBubbleSeries = {
      data: results.map((searchRes) => {
        return { name: searchRes.word, value: searchRes.score };
      }),
    };
    return new HichchartsOptions(seriesData);
  }
}
