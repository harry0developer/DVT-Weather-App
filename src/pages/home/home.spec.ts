import { Component, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { WeatherProvider } from '../../providers/weather/weather';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { MyApp } from "../../app/app.component";
import { IonicModule } from "ionic-angular";
import { BrowserModule } from "@angular/platform-browser";
import { HomePage } from './home';
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../../test-config/mocks-ionic';
import { HttpModule } from '@angular/http';

describe('HomePage component',() => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let spyOnLocation;
    let loc: LocationProvider;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                MyApp,
                HomePage
              ],
              imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp)
              ], 
              providers: [
                StatusBar,
                SplashScreen,
                Geolocation,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                FeedbackProvider,
                LocationProvider,
                WeatherProvider, 
              ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
    });

    it('getDay() should return day of week as string', () => {
        const thur = '2018-07-19 09:00:00';
        const wed = '2018-07-18 03:00:00';
        expect(component.getDay(thur)).toBe('Thursday');
        expect(component.getDay(wed)).toBe('Wednesday');
    }); 

    it('roundToNear() should convert fraction to whole number', () => {
        const roundUp = 21.6;
        const roudnDown = 21.2;
        expect(component.roundToNear(roundUp)).toBe(22);
        expect(component.roundToNear(roudnDown)).toBe(21);
    }); 

    it('getIconByWeatherDescription() should return full image path', () => {
        const desc = 'clear';
        const imgUrl = '../../assets/Icons/clear@2x.png';
        expect(component.getIconByWeatherDescription(desc)).toBe(imgUrl);
    }); 

    it('getWeatherDescription() should return weather description in uppercase', () => {
        const clear = 'clear';
        const rain = 'RAINY';
        const clouds = 'clouds';
        expect(component.getWeatherDescription(clear)).toBe('SUNNY');
        expect(component.getWeatherDescription(clouds)).toBe('CLOUDY');
        expect(component.getWeatherDescription(rain)).toBe('RAINY');
    }); 
});