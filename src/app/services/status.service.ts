import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { StatusAdapter } from '../adapters/status.adapter';
import { StatusModel } from '../models/status.model';

@Injectable({ providedIn: 'root' })
export class StatusService {
  readonly dataAPI = environment.data_api;

  constructor(private http: HttpClient, private statusAdapter: StatusAdapter) {}

  async getAllStatus(): Promise<StatusModel[]> {
    return await this.http
      .get(this.dataAPI + 'status/all')
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.statusAdapter.adapt(item))
        )
      )
      .toPromise();
  }
}
