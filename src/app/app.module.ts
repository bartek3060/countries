import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoutriesDetailsModule} from "./modules/coutries-details/coutries-details.module";
import {CoutriesMainPageModule} from "./modules/coutries-main-page/coutries-main-page.module";
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoutriesDetailsModule,
    CoutriesMainPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
