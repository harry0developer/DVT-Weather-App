import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController) {

  }

}
