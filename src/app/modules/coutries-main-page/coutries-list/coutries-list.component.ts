import {Component, Input, OnChanges} from '@angular/core';
import {Coutry} from "../../../shared/interfaces/coutry";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coutries-list',
  templateUrl: './coutries-list.component.html',
  styleUrls: ['./coutries-list.component.scss']
})
export class CoutriesListComponent implements OnChanges{
  @Input() coutriesList:Coutry[]=[]
  @Input() isLoading:boolean=false

  constructor(private router:Router) {
  }
  ngOnChanges() {
    console.log(this.isLoading)
  }

  showCoutryDetails(coutryName:string){
    this.router.navigate([coutryName])
  }

}
