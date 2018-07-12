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
// import { DomSanitizer } from '@angular/platform-browser';
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
  user = {};
  id:any;
  loading:any;

  constructor
  ( public platform: Platform, 
    // public navParams: NavParams,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public restProvider: RestProvider,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    // private sanitizer: DomSanitizer,
    private keyboard: Keyboard) 
  {
    // this.id = navParams.get("id");
    this.initializeApp();
    this.appMenuItems = [
      {title: 'Home', component: DashboardPage, icon: 'home'},
      {title: 'Buy Pass', component: BuypassPage, icon: 'md-bookmarks'},
      {title: 'Buy Ticket', component: BuyticketPage, icon: 'ios-bookmark-outline'}
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
    this.nav.push(page.component);
  }

  logout(){  
            localStorage.clear();
            this.nav.push(LoginPage);
          }
  goToProfile(){
            this.nav.push(ProfilePage);
          }
  ionViewDidLoad() {
    // this.getUser(this.id);
  }
  // getUser(id) {
  //   this.restProvider.getOneUser(id) .map(data => {
  //       this.user = {
  //         email: data.email,
  //         fullname: data.fullname,
  //         avatar: this.sanitizer.bypassSecurityTrustResourceUrl(data.avatar)
  //       };
  //     });
  // }

  // public getUser(id) {
  //   this.restProvider.getPass(id).then(data=> {
  //     this.user=data;
  //     console.log(this.user);
  //   }
  //   );
  // }
}
