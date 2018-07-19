import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ShowidPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showid',
  templateUrl: 'showid.html',
})
export class ShowidPage {
  users : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    var uid = localStorage.getItem('uid');
    this.getOneUser(uid);
  }
  getOneUser(id) {
    this.restProvider.getOneUser(id) .then(data => {
      this.users = data;
      console.log(data);
      });
  }
}
