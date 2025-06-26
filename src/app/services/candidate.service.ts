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
export class CandidateService {
  readonly dataAPI = environment.data_api;

  constructor(
    private http: HttpClient,
    private basicInfoAdapter: CandidateBasicInfoAdapter,
    private referanceAdapter: CandidateReferanceInfoAdapter,
    private referanceAllAdapter: CandidateReferanceInfoAdapterAll
  ) {}

  async getAllCandidatesBasicInfo(): Promise<CandidateInfoModel[]> {
    return await this.http
      .get(this.dataAPI + 'candidate/all')
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.basicInfoAdapter.adapt(item))
        )
      )
      .toPromise();
  }

  async getCandidateByPhoneOrEmail(
    phone: string,
    email: string
  ): Promise<CandidateInfoModel> {
    const candidate = await this.http
      .get<CandidateInfoModel>(
        this.dataAPI + 'candidate/search?phone=' + phone + '&email=' + email
      )
      .toPromise();
    return candidate;
  }

  async saveCandidateData(candidate: CandidateInfoModel) {
    return this.http
      .post(this.dataAPI + 'candidate/save', candidate)
      .toPromise();
  }

  async getCandidateReferanceData(
    bssId: number
  ): Promise<CandidateReferanceInfoModel[]> {
    return await this.http
      .get(this.dataAPI + 'candidate/referance?bssId=' + bssId)
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.referanceAdapter.adapt(item))
        )
      )
      .toPromise();
  }

  async referCandidate(candidateRefData: CandidateReferanceInfoModel) {
    return this.http
      .post(this.dataAPI + 'candidate/refer', candidateRefData)
      .toPromise();
  }

  async getAllReferanceData() {
    return await this.http
      .get(this.dataAPI + 'candidate/refer/all')
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.referanceAllAdapter.adapt(item))
        )
      )
      .toPromise();
  }
}
