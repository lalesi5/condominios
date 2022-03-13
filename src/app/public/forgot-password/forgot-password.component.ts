import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private isEmail = /\S+@\S+\.\S+/;

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isEmail)]]
  });

  constructor(public authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.forgotPasswordForm.controls;
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }
}
