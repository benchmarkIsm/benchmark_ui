export class UserModel {
  userId: number;
  userFname: string;
  userLname: string;
  userMobile: string;
  userEmail: string;
  userName: string;
  userPassword: string;
  userBadLogin: number;
  userLocked: number;
  userOtp: number;
  userStatus: string;
  compCode: number;
  enableLogin: number;

  effectiveDate: Date;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
