import {
  Component
}

from '@angular/core';
import {
  NavController
}

from 'ionic-angular';
import {
  RestProvider
}

from '../../providers/rest/rest';
@Component( {
  selector: 'page-home', templateUrl: 'home.html'
}

) export class HomePage {
  users: any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
  }
  /*dateformat(d)
  {
    var dt = new Date(d);
    var day = dt.getDate();
    var mnth = dt.getMonth()+1;
    var yr = dt.getFullYear();

    console.log(day+"-"+mnth+"-"+yr);
  }*/
  getUsers() {
    this.restProvider.getUsers() .then(data=> {
      this.users=data;
      console.log(this.users);
    }
    );
  }
}
