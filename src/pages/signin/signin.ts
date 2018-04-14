import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FindMeFirebaseProvider } from '../../providers/find-me-firebase/find-me-firebase';
import { UniqueDeviceID  } from '@ionic-native/unique-device-id';

@IonicPage({
  name: 'sign-in'
})

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  deviceId: string = "TESTDEVICEID";
  prevData = { displayName: "", mobileNo: "", condition: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public prov: FindMeFirebaseProvider, private uniqueDeviceID: UniqueDeviceID) {
    //this.profileRef.set(null);

    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log("Can get uid: " + uuid)
        this.deviceId = uuid;
        prov.deviceId = this.deviceId;
        prov.register(this.registerSuccess, this);
      })
      .catch((error: any) => 
      {
        console.log("Cannot get uid: " + error)
        prov.deviceId = this.deviceId;
        prov.register(this.registerSuccess, this);
      });
  }

  cleanDeviceId(uuid)
  {
    return uuid.replace("")

  }

  registerSuccess(loadedData, self)
  {
    self.prevData = loadedData;
  }

  signIn() {
    //console.log(this.prevData);
    this.prov.updataPersonalData();
    this.prov.updateMobileNo(this.prevData.mobileNo);
    this.navCtrl.setRoot(HomePage);
  }
}
