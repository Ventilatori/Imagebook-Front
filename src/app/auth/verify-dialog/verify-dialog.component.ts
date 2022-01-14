import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.css']
})
export class VerifyDialogComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription
  verified = false

  constructor(
    private dialogRef: MatDialogRef<VerifyDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public routeData: ActivatedRoute,
  ) { 

  }

  ngOnInit(): void {
    this.routeSubscription = this.routeData.params.subscribe(data => {
      this.verify(data['id'])
    })
  }

  ngOnDestroy(): void {
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  verify(id: string) {
    this.authService.verify(id).subscribe({
      next: _ => {
        this.verified = true
      },
      error: err => {
        //TODO: Error display
        console.log(err) 
      }
    })
  }
}
