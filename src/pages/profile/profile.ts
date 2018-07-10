import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {};
  id:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams) {
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    this.getOneUser(this.id);
  }

  getOneUser(id) {
    this.restProvider.getOneUser(id) .then(data=> {
      this.user=data;
      console.log(this.user);
    }
    );
  }
}
