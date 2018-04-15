import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
  
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
      timeout: 5000,
      enableHighAccuracy: true
    } 

    this.geolocation.getCurrentPosition(geoLocationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker(latLng);

      //var curMarker = new google.maps.Marker({
      //  map: this.map,
      //  animation: google.maps.Animation.DROP,
      //  position: latLng,
      //  draggable: true,
      //  label: 'User'
      //});

      //let watch = this.geolocation.watchPosition();
      //watch.subscribe((data) => {
      //  curMarker.setMap(null);
      //  let updLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      //});

      //navigator.geolocation.watchPosition(watchSuccess, watchError);

      //function watchSuccess(position) {
      //  var newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //  curMarker.setPosition(newLatLng);
      //}

      //function watchError(){
      //  console.log("Watch Error");
      //}
            

    }, (err) => {
      console.log(err);
    });

  }

  watchme() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.marker.setMap(null);
      let updLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      this.moveMarker(updLocation);
    });
  }


  addMarker(location) {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: location,
      draggable: true,
      label: 'User'
    });
   
    let content = "<h4>Information!</h4>";         
    this.addInfoWindow(this.marker, content);  
  }
  
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  moveMarker(newLocation){
    this.marker = new google.maps.Marker({
      map: this.map,
      position: newLocation,
      label: 'User'
    });
  }
}
