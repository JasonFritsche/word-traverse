import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IWordSearchResult } from "../interfaces/words";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  private dmBaseUrl = "https://api.datamuse.com";

  getSuggestedWords(searchTerm: string): Observable<IWordSearchResult[]> {
    return this.httpClient.get<IWordSearchResult[]>(`${this.dmBaseUrl}/sug?s=${searchTerm}`);
  }
}
