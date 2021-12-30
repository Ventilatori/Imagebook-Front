import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';

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
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  AuthType = AuthType
  hide = true

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: AuthDialogData,
  ) {
    if(data.type == AuthType.Register) {
      const password = this.authForm.get('password')
      if(password)
        password.validator = Validators.compose([password.validator,Validators.minLength(8)])
    } else {
      this.authForm.removeControl('email')
    }
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close()
  }

  onSubmit() {
    // TODO: Add loading spinner
    console.log(this.authForm.value)
    const email = this.authForm.value.email
    const username = this.authForm.value.username
    const password = this.authForm.value.password
    const action = this.data.type == AuthType.Login ?
      this.authService.login(username, password) :
      this.authService.register(email, username, password)
    action.subscribe({
      next: _ => {
        this.dialogRef.close()
      },
      error: err => {
        // TODO: Add alert/snackbar
        console.error("AuthError", err)
      }
    })
  }

  getAuthType(): string {
    return this.data.type==AuthType.Login? 'Login' : 'Register' 
  }

  getNameErrorMessage(): string {
    const username = this.authForm.get('username')
    if(username) {
      if (username.hasError('required')) {
        return 'You must enter a value'
      }
    }
    return ''
  }

  getEmailErrorMessage(): string {
    const email = this.authForm.get('email')
    if(email) {
      if (email.hasError('required')) {
        return 'You must enter a value'
      }
      else if(email.hasError('email')) {
        return 'Not a valid email'
      }
    }
    return ''
  }

  getPasswordErrorMessage(): string {
    const password = this.authForm.get('password')
    if(password) {
      if (password.hasError('required')) {
        return 'You must enter a value'
      }
      else if (password.hasError('minlength')) {
        return 'Password shorter than 8 characters.'
      }
    }
    return ''
  }
}
