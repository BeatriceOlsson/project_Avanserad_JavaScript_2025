import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { provideNativeDateAdapter } from '@angular/material/core';

bootstrapApplication(AppComponent, {providers: [provideHttpClient(), provideNativeDateAdapter(),...appConfig.providers]},  )
  .catch((err) => console.error(err));
