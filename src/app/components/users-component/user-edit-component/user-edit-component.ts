import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material-module';
import { NotificationService } from '../../../services/notification.service';
import { UserModel } from '../../../models/user.model';
import { UserTypeComponent } from '../user-type-component/userType-component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    UserTypeComponent,
  ],
  templateUrl: './user-edit-component.html',
  styleUrls: ['./user-edit-component.css'],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: UserModel;
  isNew = true;
  buttonText = 'Create';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((data) => {
        if (data && data.userId) {
          this.user = data;
          this.buttonText = 'Update';
          this.isNew = false;
        }
        this.initForm();
      });
  }

  initForm() {
    this.userForm = this.fb.group({
      userFname: [this.user?.userFname || '', Validators.required],
      userLname: [this.user?.userLname || ''],
      userMobile: [this.user?.userMobile || '', Validators.required],
      userEmail: [
        this.user?.userEmail || '',
        [Validators.required, Validators.email],
      ],
      userName: [this.user?.userName || '', Validators.required],
      userPassword: [this.user?.userPassword || '', Validators.required],
      userStatus: [this.user?.userStatus || '', Validators.required],
      enableLogin: [this.user?.enableLogin ?? 1],
    });
  }

  async saveUser() {
    const updatedUser: UserModel = {
      ...this.user,
      ...this.userForm.value,
    };

    try {
      this.userService.saveUser(updatedUser);
      console.log('Saving user', updatedUser);
      this.notifier.showSuccess(
        `${this.buttonText}d user successfully`,
        '',
        false
      );
      this.router.navigate(['/user']);
    } catch (error) {
      this.notifier.showWarning(
        `Failed to ${this.buttonText.toLowerCase()} user`,
        '',
        false
      );
    }
  }
}
