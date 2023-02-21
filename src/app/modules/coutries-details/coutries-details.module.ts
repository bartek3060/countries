import {NgModule} from "@angular/core";
import {CoutriesDetailsComponent} from "./coutries-details.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations:[CoutriesDetailsComponent],
  imports:[CommonModule,HttpClientModule,BrowserModule, SharedModule]
})
export class CoutriesDetailsModule{}
