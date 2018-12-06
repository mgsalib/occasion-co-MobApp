import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { ConfigClass } from "../providers";
/*
  Generated class for the HttpBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpBaseProvider {

  url = "";
  params: HttpParams;

  constructor(private _http: HttpClient) {
  }

  get(serviceObj, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall) {
      this.params = new HttpParams().set('backgroundCall', "true");
    }
    return this._http.get(ConfigClass.getEndpoint + this.url + queryString, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  post(serviceObj, data, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall) {
      this.params = new HttpParams().set('backgroundCall', "true");
    }

    return this._http.post(ConfigClass.getEndpoint + this.url + queryString, data, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  put(serviceObj, data, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall) {
      this.params.append("backgroundCall", "true");
    }

    return this._http.put(ConfigClass.getEndpoint + this.url + queryString, data, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }

  delete(serviceObj, queryString = ""): any {

    this.url = serviceObj.url;

    if (serviceObj.backgroundCall) {
      this.params.append("backgroundCall", "true");
    }

    return this._http.delete(ConfigClass.getEndpoint + this.url + queryString, { params: this.params }).timeout(ConfigClass.getTimeout).map(res => res);
  }
}
