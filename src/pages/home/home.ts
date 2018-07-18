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

  day: Array<string> = ['Sunday','Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  data: any = [];

  isCloudy: boolean = true;
  isSunny: boolean = false;
  isRainy: boolean = false;
  imageBG: string = '';
  error: boolean = false;

  baseImagesUrl: string = '../../assets/Images/sea_';
  baseIconsUrl: string = '../../assets/Icons/';

  today: any; 
  constructor(
    private location: LocationProvider, 
    private weather: WeatherProvider,
    private feedback: FeedbackProvider,
  ) {
    
  }

  ionViewDidLoad() { 
    this.getWeatherData();
  }

  getDay(date) {
    return this.day[new Date(date).getDay()];
  }

  roundToNear(num) {
    return Math.round(num);
  }

  setTempTheme(data) {
    if (data.weather[0].main.toLowerCase() === 'clear') {
      this.isCloudy = false;
      this.isRainy = false;
      this.isSunny = true;
      this.imageBG = this.baseImagesUrl + 'sunny.png';
    }
    else if (data.weather[0].main.toLowerCase() === 'rain') {
      this.isCloudy = false;
      this.isRainy = true;
      this.isSunny = false;
      this.imageBG = this.baseImagesUrl + 'rainy.png';
    } else {
      this.isCloudy = true;
      this.isRainy = false;
      this.isSunny = false;
      this.imageBG = this.baseImagesUrl + 'cloudy.png';
    }
  }

  getIconByWeatherDescription(desc: string) {
    if (desc.toLocaleLowerCase() === 'clear') {
      return this.baseIconsUrl + 'clear@2x.png'
    }
    else if (desc.toLocaleLowerCase() === 'rain') {
      return this.baseIconsUrl + 'rain@2x.png'
    }
      return this.baseIconsUrl + 'partlysunny@2x.png'
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
        this.today = this.data[0];
        this.setTempTheme(this.today);
      }).catch(error => {
        this.error = true;
        this.feedback.dismissLoadingSpinner();
        console.log(error);
      })
    }).catch(error => {
      this.error = true;
      this.feedback.dismissLoadingSpinner();
      console.log(error);
    });
  }

  retry() {
    this.error = false;
    this.getWeatherData();
  }
}
