import {Component, Input } from '@angular/core';
import {Coutry} from "../../../shared/interfaces/coutry";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coutries-list',
  templateUrl: './coutries-list.component.html',
  styleUrls: ['./coutries-list.component.scss']
})
export class CoutriesListComponent {
  @Input() coutriesList:Coutry[]=[]
  @Input() isLoading:boolean=false

  constructor(private router:Router) {
  }

  showCoutryDetails(coutryName:string):void{
    this.router.navigate([coutryName])
  }
}
