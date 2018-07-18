import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  constructor(private geolocation: Geolocation) {}

  getLocation() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        resolve(resp.coords);
      }).catch((error) => {
        resolve(error);
        console.log('Error getting location', error);
      });
      let watch = this.geolocation.watchPosition();
      watch.subscribe((resp) => {
        resolve(resp.coords);
      });
    });
  }

}
