import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-buypass',
  templateUrl: 'buypass.html',
})

export class BuypassPage {
  passtype: any;

  public SelectPassType: Array<any> = [
    {type: 'Daily Pass',pt_id: '1' },
    {type: 'Monthly Pass',pt_id: '2'},
    {type: 'Student Pass',pt_id: '3'},
    {type: 'Other Pass',pt_id: '4'}
  ]
  constructor(public navCtrl: NavController,public alerCtrl: AlertController, public navParams: NavParams,public restProvider: RestProvider) 
  {
  }

  public getPass(buypass) {
    this.restProvider.getPass(buypass).then(data=> {
      this.passtype=data;
    }
    );
  }
  tapEvent() {
    let alert = this.alerCtrl.create({
      title: 'Hi,',
      message: 'Proceed to Payment',
      buttons: ['Ok']
    });
    alert.present()
  }
}
