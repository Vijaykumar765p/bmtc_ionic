import { Injectable } from '@angular/core';
import {Http,RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
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

// BUY PASS API
  getPass(type){
    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'getpasstype?type='+type).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

// GET ALL USERS API
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

// GET SINGLE USER
  getOneUser(id) {
    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'users/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });  
  }

// LOGIN API
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

//CREATE BMTC ID API
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

// SIGN UP/REGISTER API
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
