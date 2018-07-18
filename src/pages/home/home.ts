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

  getWeatherData() {
    this.feedback.presentLoadingSpinner('Getting location...');
    this.location.getLocation().then(latLng => {
      this.feedback.dismissLoadingSpinner();
      this.feedback.presentLoadingSpinner('Getting weather data...');
      this.weather.getWeatherData(latLng).then(data => {
        this.feedback.dismissLoadingSpinner();
        console.log(data);
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
