import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material-module';
import { NotificationService } from '../../services/notification.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, MaterialModule],
})
export class Login implements OnInit {
  loginForm: FormGroup;
  error: string = '';

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

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Username and Password are required.';
      return;
    }

    try {
      const user = await this.authService.login(
        this.usernameControl?.value,
        this.passwordControl?.value
      );

      if (user) {
        this.error = '';
        this.router.navigate(['/dashboard']);
        this.notification.showInfo('User Logged in', '', false);
      } else {
        this.error = 'Invalid username or password.';
        this.notification.showError(this.error, '', false);
      }
    } catch (err) {
      this.error = 'Authentication failed. Please try again.';
      this.notification.showError(this.error, '', false);
      console.error(err);
    }
  }
}
