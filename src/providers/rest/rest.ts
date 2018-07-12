import { Injectable } from '@angular/core';
import {Http,RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

let apiUrl = 'http://192.168.1.20:2000/';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable()
export class RestProvider {

  constructor(private http:Http, private HttpClient:HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getPass(type){
    // return this.http.get(apiUrl+'getpasstype?type='+type).pipe(
    //   map(this.extractData),
    //   catchError(this.handleError)
    // );

    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'getpasstype?type='+type).subscribe(data => {

        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'users').subscribe(data => {

        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getOneUser(id):Observable<any> {
    // return new Promise(resolve => {
    //   this.HttpClient.get(apiUrl+'users/'+id).subscribe(data => {

    //     console.log(data);
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });  
    console.log("http://192.168.1.20:2000/users/"+id);
    return this.http.get(apiUrl+'users?userid='+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

 doLogin(formdata,cb) {
    let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
        });
        let options = new RequestOptions({ headers: headers });

      this.http
          .post(apiUrl+'login', formdata, options)
          .subscribe(data => 
          {
            cb(data);
                 
          }, error => {
                      console.log(JSON.stringify(error.json()));
          });
  }

createBmtcId(formdata,cb) {
    let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
        });
        let options = new RequestOptions({ headers: headers });

      this.http
          .post(apiUrl+'createbmtcid', formdata, options)
          .subscribe(data => 
          {
            cb(data);
                 
          }, error => {
                      console.log(JSON.stringify(error.json()));
          });
  }

  doRegister(formdata,cb) {
    let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
        });
        let options = new RequestOptions({ headers: headers });

      this.http
          .post(apiUrl+'register', formdata, options)
          .subscribe(data => 
          {
            cb(data);
                 
          }, error => {
                      console.log(JSON.stringify(error.json()));
          });
  }
}
