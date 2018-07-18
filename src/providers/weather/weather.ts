import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  baseUrl: string = 'http://api.openweathermap.org/data/2.5/forecast?';
  apiKey: string = 'e2fcb6f0abf02cbfbbbc0b14cf661927';
  constructor(public http: Http) {
  }
 
  getWeatherData(latLng) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.buildUrl(latLng))
        .toPromise()
        .then(
          res => { 
            resolve(res.json());
          }).catch(error => {
            reject(error);
          });
    });
    return promise;
  }

  private buildUrl(latLng): string {
    return `${this.baseUrl}lat=${latLng.latitude}&lon=${latLng.longitude}&units=metric&APPID=${this.apiKey}` || '';
  }
}