import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoutriesMainPageComponent } from "./modules/coutries-main-page/coutries-main-page.component";
import { CoutriesDetailsComponent } from "./modules/coutries-details/coutries-details.component";

const routes: Routes = [
  {
    path: "",
    component: CoutriesMainPageComponent,
  },
  {
    path: ":coutry-name",
    component: CoutriesDetailsComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
