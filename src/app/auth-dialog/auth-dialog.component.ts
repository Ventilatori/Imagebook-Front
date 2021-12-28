import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export enum AuthType {
  Login,
  Register
}

export interface AuthDialogData {
  type: AuthType;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  // TODO: Doesn't check if they're the same
  passwordRetype = new FormControl('', [Validators.required, Validators.minLength(8)]);
  hide = true

  AuthType = AuthType

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthDialogData
  ) {
    if(data.type == AuthType.Register) {
      this.password.validator = Validators.compose([this.password.validator,Validators.minLength(8)])
    }
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getAuthType(): string {
    return this.data.type==AuthType.Login? 'Login' : 'Register' 
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.password.hasError('minlength')) {
      return 'Password shorter than 8 characters.'
    }
    return ''
  }
}
