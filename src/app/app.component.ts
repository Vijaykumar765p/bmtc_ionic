import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { BuypassPage } from '../pages/buypass/buypass';
import { BuyticketPage } from '../pages/buyticket/buyticket';
import { ProfilePage } from '../pages/profile/profile';
import { ShowidPage } from '../pages/showid/showid';
import { RestProvider } from '../providers/rest/rest';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  appMenuItems: Array<MenuItem>;
  users: any;
  id:any;
  loading:any;

  constructor
  ( public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public restProvider: RestProvider,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    private keyboard: Keyboard) 
  {
    this.initializeApp();
    this.appMenuItems = [
      {title: 'Home', component: DashboardPage, icon: 'home'},
      {title: 'Buy Pass', component: BuypassPage, icon: 'md-bookmarks'},
      {title: 'Buy Ticket', component: BuyticketPage, icon: 'ios-bookmark-outline'},
      {title: 'Show ID', component: ShowidPage, icon: 'ios-card-outline'}
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){  
            localStorage.clear();
            this.nav.setRoot(LoginPage);
          }
  goToProfile(){
            this.nav.setRoot(ProfilePage);
          }

  ionViewDidLoad() {
            var uid = localStorage.getItem('uid');
            this.getOneUser(uid);
          }
  public getOneUser(id) {
    this.restProvider.getOneUser(id).then(data=> {
      this.users=data;
      console.log(data);
    }
    );
  }
}
