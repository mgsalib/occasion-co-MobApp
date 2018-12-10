import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { AlertProvider } from "../alert/alert";
import { GlobalProvider } from "../global/global";

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(private alert: AlertProvider, private globals: GlobalProvider) { }

  callsArr: any = [];
  paramsArr: HttpParams;
  displayLoadingSpinner: boolean = true;

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    // if (this.globals.accessToken != "") {
    //   headers = headers.set('Authorization', 'Bearer ' + this.globals.accessToken);
    // }

    this.paramsArr = req.params;

    if (this.paramsArr.has("backgroundCall")) {
      this.displayLoadingSpinner = false;
      this.paramsArr = this.paramsArr.delete("backgroundCall");
    }

    const newReq = req.clone({
      headers: headers,
      params: this.paramsArr
    });

    if (newReq.url.indexOf("./assets/i18n/") < 0 && this.displayLoadingSpinner) {
      this.callsArr.push(1);
      this.alert.displayLoadingSpinner();
    }

    return next.handle(newReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.callsArr.pop();
        if (this.callsArr.length == 0) {
          this.alert.dismissLoadingSpinner();
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        this.callsArr.pop();

        if (this.callsArr.length == 0) {
          this.alert.dismissLoadingSpinner();
        }

        if (typeof err.error == "string") {
          this.alert.displayErrorToast(err.error);
        }
        else if (err.message && typeof err.message == "string") {
          this.alert.displayErrorToast(err.message);
        }
      }
    });
  }
}