import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FindMeFirebaseProvider } from '../../providers/find-me-firebase/find-me-firebase';

@IonicPage({
  name: 'map-locator'
})

@Component({
  selector: 'page-map-locator',
  templateUrl: 'map-locator.html',
})
export class MapLocatorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov: FindMeFirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapLocatorPage');
  }

}
