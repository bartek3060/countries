import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoutriesService } from '../../shared/services/coutries.service';
import { Observable, switchMap } from 'rxjs';
import { CoutryDetails } from '../../shared/interfaces/coutry-details';

@Component({
  selector: 'app-coutries-details',
  templateUrl: './coutries-details.component.html',
  styleUrls: ['./coutries-details.component.scss'],
})
export class CoutriesDetailsComponent implements OnInit {
  public coutryDetails$: Observable<CoutryDetails> | undefined;

  constructor(
    private route: ActivatedRoute,
    private coutriesService: CoutriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coutryDetails$ = this.route.params.pipe(
      switchMap((params) =>
        this.coutriesService.getCoutryDetails(params['coutry-name'])
      )
    );
  }

  returnToList() {
    this.router.navigate(['..']);
  }
}
