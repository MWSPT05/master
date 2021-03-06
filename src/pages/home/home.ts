import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  private myName: string = "Eric R. Gutierrez";
  private myTelnbr: string = "96319121";
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private callNumber: CallNumber) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap() {
    this.findMe();
    this.watchme();
  }

  findMe(){
     let geoLocationOptions = {
      maximumAge: 3000,
      enableHighAccuracy: true
    } 

    this.geolocation.getCurrentPosition(geoLocationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      var strLati = parseFloat(position.coords.latitude + ' ');
      var strLong = parseFloat(position.coords.longitude + ' ');
      var strCoord = 'Name = <b>' + this.myName + '</b> <br/>' + 
                     'Tel/HP = ' + this.myTelnbr + '<br/>'     +
                     '(click on icon to call HP) <br/>' + 
                     'Lat = ' + strLati + ', Long = ' + strLong;
     
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let curPosImage = "assets/imgs/person2.png";
      this.addMarker(latLng, curPosImage, strCoord);
           
    }).catch((error) => {
      console.log(error);
    });
  }

  watchme() {
    let watch = this.geolocation.watchPosition();
    let moveImage = "assets/imgs/person2.png";
    watch.subscribe((data) => {
      this.marker.setMap(null);
      let updLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      
      var strLati = parseFloat(data.coords.latitude + ' ');
      var strLong = parseFloat(data.coords.longitude + ' ');
      var strCoord = 'Name = <b>' + this.myName + '</b> <br/>' + 
                     'Tel/HP = ' + this.myTelnbr + '<br/>'     +
                     '(click on icon to call HP) <br/>' + 
                     'Lat = ' + strLati + ', Long = ' + strLong;

      this.moveMarker(updLocation, moveImage, strCoord);
    });
  }

  addMarker(location, curPosImage, strCoord) {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: location,
      icon: curPosImage
    });
   
    let content = strCoord;         
    this.addInfoWindow(this.marker, content);  
  }
  
  addInfoWindow(marker, content){
     let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    infoWindow.open(this.map, marker);
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      this.callNumber.callNumber(this.myTelnbr, true)
        .then(res => console.log('Laumched dialer!',res))
        .catch(err => console.log('Error launching dialer', err));
    });
  }

  moveMarker(newLocation, moveImage, strCoord){
    this.marker = new google.maps.Marker({
      map: this.map,
      position: newLocation,
      icon: moveImage
    });

    let content = strCoord;         
    this.addInfoWindow(this.marker, content);  
  }
}
