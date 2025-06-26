import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<UserModel> {
  adapt(item: any): UserModel {
    const user = new UserModel();
    if (item) {
      user.userId = item.userId;
      user.userFname = item.userFname;
      user.userLname = item.userLname;
      user.userMobile = item.userMobile;
      user.userEmail = item.userEmail;
      user.userName = item.userName;
      user.userPassword = item.userPassword;
      user.userBadLogin = item.userBadLogin;
      user.userLocked = item.userLocked;
      user.userOtp = item.userOtp;
      user.userStatus = item.userStatus;
      user.compCode = item.compCode;
      user.enableLogin = item.enableLogin;

      user.effectiveDate = item.effectiveDate;
      user.expirationDate = item.expirationDate;
      user.createdAt = item.createdAt;
      user.updatedAt = item.updatedAt;
    }
    return user;
  }
}
