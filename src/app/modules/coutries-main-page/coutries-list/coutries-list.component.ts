import {Component, Input} from '@angular/core';
import {Coutry} from "../../../shared/interfaces/coutry";

@Component({
  selector: 'app-coutries-list',
  templateUrl: './coutries-list.component.html',
  styleUrls: ['./coutries-list.component.scss']
})
export class CoutriesListComponent {
  @Input() coutriesList:Coutry[]=[]

}
