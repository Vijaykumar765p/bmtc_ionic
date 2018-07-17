import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  users : any;
  // id:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    var uid = localStorage.getItem('uid');
    this.getOneUser(uid);
  }

  getOneUser(id) {
    this.restProvider.getOneUser(id) .then(data => {
      this.users = data;
      });
  }
}
