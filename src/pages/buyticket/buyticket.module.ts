import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyticketPage } from './buyticket';

@NgModule({
  declarations: [
    BuyticketPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyticketPage),
  ],
})
export class BuyticketPageModule {}
