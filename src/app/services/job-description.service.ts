import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { JobDescriptionModel } from '../models/job-description.model';
import { JobDescriptionAdapter } from '../adapters/job-description.adapter';

@Injectable({ providedIn: 'root' })
export class JobDescriptionService {
  readonly dataAPI = environment.data_api;

  constructor(
    private http: HttpClient,
    private jdAdapter: JobDescriptionAdapter
  ) {}

  async getAllJD(): Promise<JobDescriptionModel[]> {
    return await this.http
      .get(this.dataAPI + 'jobdescription/all')
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.jdAdapter.adapt(item))
        )
      )
      .toPromise();
  }

  async saveJD(job: JobDescriptionModel) {
    return this.http
      .post(this.dataAPI + 'jobdescription/save', job)
      .toPromise();
  }
}
