import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { IToasterMessage } from "../interfaces/toast";

@Injectable({
  providedIn: "root",
})
export class AppService {
  constructor(private toastr: ToastrService) {
    this.showToaster$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((message: IToasterMessage) => {
      this.nextToastMessage(message);
    });
  }

  private showToasterSubject = new Subject<IToasterMessage>();

  showToaster$ = this.showToasterSubject.asObservable();

  showToaster(toasterMessage: IToasterMessage) {
    this.showToasterSubject.next(toasterMessage);
  }

  nextToastMessage(messageData: IToasterMessage) {
    const { message, messageType } = messageData;
    switch (messageType) {
      case "error":
        this.toastr.error(message);
        break;
      case "info":
        this.toastr.info(message);
        break;
      case "warning":
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
