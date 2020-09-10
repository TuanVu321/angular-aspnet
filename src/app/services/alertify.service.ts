import {Injectable} from '@angular/core';
import * as alertify from 'alertifyjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }

  // tslint:disable-next-line:typedef
  confirm(message: string, okCalback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCalback();
      } else {
      }
    });
  }

  // tslint:disable-next-line:typedef
  success(message: string) {
    alertify.success(message);
  }

  // tslint:disable-next-line:typedef
  error(message: string) {
    alertify.error(message);
  }

  // tslint:disable-next-line:typedef
  warning(message: string) {
    alertify.warning(message);
  }

  // tslint:disable-next-line:typedef
  message(message: string) {
    alertify.message(message);
  }

}
