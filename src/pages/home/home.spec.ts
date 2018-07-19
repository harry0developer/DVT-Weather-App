import { Component, ErrorHandler } from '@angular/core';
import { NavController, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { WeatherProvider } from '../../providers/weather/weather';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { MyApp } from "../../app/app.component";
import { IonicModule } from "ionic-angular";
import { By, BrowserModule } from "@angular/platform-browser";
import { ElementRef } from "@angular/core";
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

describe('HomePage',() => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

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

    it('should return day of week as string', () => {
        const date = '2018-07-19 09:00:00';
        expect(component.getDay(date)).toBe('Thursday')
    }); 

});