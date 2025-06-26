// Based on http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserAdapter } from '../adapters/user.adapter';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  readonly dataAPI = environment.data_api;
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  private loggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Broadcast new user details
  private newUser = new BehaviorSubject<any>(null);
  castNewUser = this.newUser.asObservable();

  private userPermissions = new BehaviorSubject<any>(null);
  castUserPermissins = this.userPermissions.asObservable();

  constructor(
    private http: HttpClient,
    private userAdapater: UserAdapter,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public get getUser() {
    return this.newUser.asObservable();
  }

  async login(username: string, password: string): Promise<UserModel> {
    const user = await this.http
      .get<UserModel>(
        this.dataAPI +
          'user/login?username=' +
          username +
          '&password=' +
          password
      )
      .toPromise();
    if (user) {
      const data = this.userAdapater.adapt(user);
      this.currentUserSubject.next(data);
      this.newUser.next(data);

      this.router.navigate(['/']);
      return data;
    } else {
      this.loggedIn.next(false);
      return user;
    }
  }

  logout() {
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    this.newUser.next(null);
  }
}
