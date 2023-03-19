import { NgModule } from "@angular/core";
import { CoutriesMainPageComponent } from "./coutries-main-page.component";
import { FiltersComponent } from "./filters/filters.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CoutriesListComponent } from "./coutries-list/coutries-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    CoutriesMainPageComponent,
    FiltersComponent,
    CoutriesListComponent,
  ],
})
export class CoutriesMainPageModule {}
