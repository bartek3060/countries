import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoutriesService} from "../../shared/services/coutries.service";
import {Observable} from "rxjs";
import {CoutryDetails} from "../../shared/interfaces/coutry-details";

@Component({
  selector: 'app-coutries-details',
  templateUrl: './coutries-details.component.html',
  styleUrls: ['./coutries-details.component.scss']
})
export class CoutriesDetailsComponent implements OnInit{

  public coutryDetails$:Observable<CoutryDetails>|undefined

  constructor(private route:ActivatedRoute,private coutriesService:CoutriesService) {
  }
  ngOnInit() {
this.route.params.subscribe(params=>{
  this.coutryDetails$=this.coutriesService.getCoutryDetails(params['coutry-name'])
})
    this.coutryDetails$?.subscribe(console.log)

  }

}
