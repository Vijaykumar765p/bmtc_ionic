import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { SignupPage } from '../../pages/signup/signup';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { username: '', password: ''}
  navCtrlData;

    constructor(public navCtrl: NavController,public forgotCtrl: AlertController,public menu: MenuController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
      this.navCtrlData=navCtrl;
      this.menu.swipeEnable(false);
    }


    ionViewDidLoad() {
      let user = JSON.parse(localStorage.getItem('PERSON'));
      if (user){
        this.user = user;
        this.navCtrl.setRoot(DashboardPage);
      } 
    }


    login(navCtrlData)
    {
         var body = JSON.stringify({
              email: this.user.username,
              password: this.user.password
         });

        var self=this;
      	this.restProvider.doLogin(body, function(res)
        {

          var resdata=JSON.parse(res._body);
              if(resdata.length>0)
              {
                  if(resdata[0].exist == 0)
                    {
                      let toast = self.toastCtrl.create({
                      message: 'Oops...! Please Enter Valid Credentials',
                      duration: 3000,
                    });
                    toast.present(toast);
                    self.user = { username: '', password: ''}
                  }
                  else
                  {
                    navCtrlData.setRoot(DashboardPage);
                    self.user = { username: '', password: ''}
                  }
                  localStorage.setItem('PERSON', JSON.stringify(self.user));
                  localStorage.setItem('uid', resdata[0].user_id);
              }
        });
        //Api connections
        // this.navCtrl.push(HomePage);
        
    }

    signup()
    {
      //Api connections
      this.navCtrl.push(SignupPage);
    }

    forgotPass() {
      let forgot = this.forgotCtrl.create({
        title: 'Forgot Password?',
        message: "Enter your email address to send a reset link password.",
        inputs: [
          {
            name: 'email',
            placeholder: 'Email',
            type: 'email'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              console.log('Send clicked');
              let toast = this.toastCtrl.create({
                message: 'Email was sent successfully',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }
          }
        ]
      });
      forgot.present();
    }
}
