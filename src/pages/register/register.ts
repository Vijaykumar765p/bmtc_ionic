import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  periodType: any;
  user = { fname: '',lname: '',gender:'',dob:'',address:'',period:'',photo:'',sign:'' };
  imgPreview1 = 'assets/img/users.png';
  imgPreview2 = 'assets/img/signcolor.png';
  id:any;
  public SelectGenderType: Array<any> = [
    {type: 'Male', },
    {type: 'Female'},
    {type: 'Others'}
  ]
  constructor
    ( 
      public navCtrl: NavController, 
      public navParams: NavParams,
      public restProvider: RestProvider,
      private imagePicker: ImagePicker,
      private base64: Base64,
      public alerCtrl: AlertController
    ) 
    {
    }

      getPhoto() {
        let options = {
          maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.imgPreview1 = results[i];
              this.base64.encodeFile(results[i]).then((base64File: string) => {
                this.user.photo = base64File;
              }, (err) => {
                console.log(err);
              });
          }
        }, (err) => { });
      }
      getSign() {
        let options = {
          maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.imgPreview2 = results[i];
              this.base64.encodeFile(results[i]).then((base64File: string) => {
                this.user.sign = base64File;
              }, (err) => {
                console.log(err);
              });
          }
        }, (err) => { });
      }
    saveData()
   {
    var uid = localStorage.getItem('uid');
     var body = JSON.stringify(
         {
              id: uid,
              fname: this.user.fname,
              lname: this.user.lname,
              gender: this.user.gender,
              dob: this.user.dob,
              address: this.user.address,
              period:this.user.period,
              photo: this.user.photo,
              sign: this.user.sign
         });

        this.restProvider.userUpdate(body, function(res)
        { 
        });
        this.user = { fname: null,lname: null,gender:null,dob:null,address:null,period:null,photo:null,sign:null};
        //Api connections
        // this.navCtrl.push(WelcomePage);
        let alert = this.alerCtrl.create({
          title: 'Hi,',
          message: 'Make Payment',
          buttons: ['Ok']
        });
        alert.present()
    }
  reset()
  {
    this.user = { fname: null,lname: null,gender:null,dob:null,address:null,period:null,photo:null,sign:null};
  }

  public gperiod() {
    this.restProvider.getPeriod().then(data=> {
      this.periodType=data;
    }
    );
  }
  ionViewDidLoad() {

    this.gperiod();
  }
 }

