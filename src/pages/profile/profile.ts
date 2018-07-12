import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
// import { DomSanitizer } from '@angular/platform-browser';

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
    var uid = localStorage.getItem('uid');
    this.getOneUser(uid);
  }

  // getOneUser(id) {
  //   this.restProvider.getOneUser(id) .then(data=> {
  //     this.user=data;
  //     console.log(this.user);
  //   }
  //   );
  // }

  getOneUser(id) {
    console.log("User Id:"+id);
    this.restProvider.getOneUser(id) .map(data => {
        this.user = {
          fullname: data.userfullname,
          email: data.useremail,
          mob: data.usermob
          // avatar: this.sanitizer.bypassSecurityTrustResourceUrl(data.avatar)
        };
      });
  }
}
