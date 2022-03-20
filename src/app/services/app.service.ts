import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { ISearchCriteria } from 'src/interfaces/words';
import { IToasterMessage } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private toastr: ToastrService) {
    this.showToaster$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((message: IToasterMessage) => {
        this.nextToastMessage(message);
      });
  }

  private readonly _latestWordSearch = new BehaviorSubject<ISearchCriteria>({
    word: '',
    searchOptions: '',
  });

  get latestWordSearch(): ISearchCriteria {
    return this._latestWordSearch.getValue();
  }

  private set latestWordSearch(value: ISearchCriteria) {
    this._latestWordSearch.next(value);
  }

  nextLatestWordSearch(value: ISearchCriteria) {
    this.latestWordSearch = value;
  }

  private showToasterSubject = new Subject<IToasterMessage>();

  showToaster$ = this.showToasterSubject.asObservable();

  showToaster(toasterMessage: IToasterMessage) {
    this.showToasterSubject.next(toasterMessage);
  }

  nextToastMessage(messageData: IToasterMessage) {
    const { message, messageType } = messageData;
    switch (messageType) {
      case 'error':
        this.toastr.error(message);
        break;
      case 'info':
        this.toastr.info(message);
        break;
      case 'warning':
        this.toastr.warning(message);
        break;
      default:
        this.toastr.success(message);
    }
  }

  generateRGBColor() {
    const numba = () => Math.floor(Math.random() * 190) + 1;
    return `rgb(${numba()}, ${numba()}, ${numba()})`;
  }
}
