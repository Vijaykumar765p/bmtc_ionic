import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../../pages/home/home';
import { RestProvider } from '../../providers/rest/rest';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = { fname: '',lname: '', email: '', password: '',gender:'',dob:'',address:'',avatar:'' };
  imgPreview = 'assets/img/blank-avatar.jpg';
  isfemale: any;
  ismale: any;
  selectedgender:any;
  constructor
    ( 
      public navCtrl: NavController, 
      public navParams: NavParams,
      public restProvider: RestProvider,
      private imagePicker: ImagePicker,
      private base64: Base64
    ) 
    {
      this.isfemale = false;
      this.ismale = false;
    }

    selectgender(value)
     {
        if(value == 'Male')
        {
            this.isfemale = false;
            this.ismale = true;
        }
        else if(value == 'Female')
        {
            this.isfemale = true;
            this.ismale = false;
        }
          this.selectedgender = value;
      }

      getPhoto() {
        let options = {
          maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.imgPreview = results[i];
              this.base64.encodeFile(results[i]).then((base64File: string) => {
                this.user.avatar = base64File;
              }, (err) => {
                console.log(err);
              });
          }
        }, (err) => { });
      }
    saveData()
   {
     var body = JSON.stringify(
         {
              fname: this.user.fname,
              lname: this.user.lname,
              email: this.user.email,
              password: this.user.password,
              gender: this.selectedgender,
              dob: this.user.dob,
              address: this.user.address,
              avatar: this.user.avatar
         });

     console.log(body);
        this.restProvider.doRegister(body, function(res)
        {
          console.log(body);
        });
        //Api connections
        // this.navCtrl.push(WelcomePage);
    }
  reset()
  {
    this.user = { fname: null,lname: null, email: null, password: null,gender:null,dob:null,address:null,avatar:null};
  }
 }
