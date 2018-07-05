import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { RegisterPage } from "../../pages/register/register";
import { BuypassPage } from "../../pages/buypass/buypass";
import { BuyticketPage } from "../buyticket/buyticket";


@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  slideData = [
    { image: "assets/img/slide1.jpg" },
    { image: "assets/img/slide2.jpg" },
    { image: "assets/img/slide3.jpg" }
  ];
  constructor(public navCtrl: NavController,public menu: MenuController, public navParams: NavParams) {
    this.menu.swipeEnable(true);
  }

  pass() {
    //Api connections
    this.navCtrl.push(BuypassPage);
  }

  ticket() {
    //Api connections
    this.navCtrl.push(BuyticketPage);
  }

  idcard() {
    //Api connections
    this.navCtrl.push(RegisterPage);
  }
}
