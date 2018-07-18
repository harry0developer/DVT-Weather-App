import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { WeatherProvider } from '../../providers/weather/weather';
import { FeedbackProvider } from '../../providers/feedback/feedback';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weekdays = [
    {
      day: 'Monday',
      temp: 22,
    },
    {
      day: 'Tuesday',
      temp: 21,
    },
    {
      day: 'Wednesday',
      temp: 30,
    },
    {
      day: 'Thursday',
      temp: 18,
    },
    {
      day: 'Friday',
      temp: 19,
    }
    ,
    {
      day: 'Friday',
      temp: 19,
    }
  ];

  day: Array<string> = ['Sunday','Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  data: any = [];

  isCloudy: boolean = true;
  isSunny: boolean = false;
  isRainy: boolean = false;

  constructor(
    private location: LocationProvider, 
    private weather: WeatherProvider,
    private feedback: FeedbackProvider,
  ) {
    
  }

  ionViewDidLoad() { 
    this.getWeatherData();
  }

  getDay(timestamp) {
    return new Date(timestamp);
  }
  getWeatherData() {
    let tmpData;
    this.feedback.presentLoadingSpinner('Getting location...');
    this.location.getLocation().then(latLng => {
      this.feedback.dismissLoadingSpinner();
      this.feedback.presentLoadingSpinner('Getting weather data...');
      this.weather.getWeatherData(latLng).then(data => {
        this.feedback.dismissLoadingSpinner();
        tmpData = data;
        this.data = tmpData.list.filter(d => d.dt_txt.endsWith('21:00:00'));
        console.log(this.data);
      }).catch(error => {
        this.feedback.dismissLoadingSpinner();
        console.log(error);
      })
    }).catch(error => {
      this.feedback.dismissLoadingSpinner();
      console.log(error);
    });
  }

}
