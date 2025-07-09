import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { StatusAdapter } from '../adapters/status.adapter';
import { StatusModel } from '../models/status.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly dataAPI = environment.data_api;

  constructor(private http: HttpClient, private statusAdapter: StatusAdapter) {}

  async getAllUsers(): Promise<StatusModel[]> {
    return await this.http
      .get(this.dataAPI + 'user/all')
      .pipe(map((data: any[]) => data.map((item: any) => item)))
      .toPromise();
  }

  async saveUser(job: UserModel): Promise<any> {
    return this.http.post(this.dataAPI + 'user/update', job).toPromise();
  }
}
