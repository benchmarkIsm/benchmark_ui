import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material-module';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Form submitted:', this.loginForm.value);
      this.notification.showWarning('Username/Password incorrect', '', false);
      // this.router.navigate(['/dashboard']);
    }
    try {
      const user = await this.authService.login(
        this.usernameControl.value,
        this.passwordControl.value
      );
      if (user) {
        this.router.navigate(['/dashboard']);
        this.notification.showInfo('User Logged in', '', false);
      } else {
        this.notification.showError('Username/Password incorrect', '', false);
      }
    } catch (error) {
      this.notification.showError('Error in Authentication', '', false);
      console.error(error);
    }
  }
}
