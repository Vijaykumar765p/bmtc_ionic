import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../../pages/login/login';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	user = { emailid: '',mobileno: '', password: '',fullname: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  signUp()
   {
     var body = JSON.stringify(
         {
         	    fullname: this.user.fullname,
              emailid: this.user.emailid,
              mobileno: this.user.mobileno,
              password: this.user.password
         });

     console.log(body);
        this.restProvider.createBmtcId(body, function(res)
        {
          console.log(body);
        });
        this.navCtrl.push(DashboardPage);
    }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
