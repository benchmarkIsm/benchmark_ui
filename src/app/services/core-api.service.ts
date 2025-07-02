import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { CandidateInfoModel } from '../models/candidate-info.module';
import { CandidateBasicInfoAdapter } from '../adapters/candidate.adapter';
import { CandidateReferanceInfoAdapter } from '../adapters/candidate-referance.adapter';
import { CandidateReferanceInfoModel } from '../models/candidate-referance-info.model';
import { CandidateReferanceInfoModelAll } from '../models/candidate-referance-info-all.model';
import { CandidateReferanceInfoAdapterAll } from '../adapters/candidate-referance-all.adapter';

@Injectable({ providedIn: 'root' })
export class CoreService {
  readonly coreAPI = environment.core_api;

  constructor(private http: HttpClient) {}

  async sendJobEmail(data: CandidateReferanceInfoModelAll) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this.http
      .post(this.coreAPI + 'send-job-email', JSON.stringify(data), httpOptions)
      .toPromise();
  }
}
