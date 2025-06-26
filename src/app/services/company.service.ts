import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CompanyModel } from '../models/company.model';
import { CompanyAdapter } from '../adapters/company.adapter';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  readonly dataAPI = environment.data_api;

  constructor(
    private http: HttpClient,
    private companyAdapater: CompanyAdapter
  ) {}

  async getAllCompanies(): Promise<CompanyModel[]> {
    return await this.http
      .get(this.dataAPI + 'company/all')
      .pipe(
        map((data: any[]) =>
          data.map((item: any) => this.companyAdapater.adapt(item))
        )
      )
      .toPromise();
  }

  async saveCompany(company: CompanyModel) {
    return this.http.post(this.dataAPI + 'company/save', company).toPromise();
  }
}
