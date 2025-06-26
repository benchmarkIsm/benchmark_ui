import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { CompanyModel } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyAdapter implements Adapter<CompanyModel> {
  adapt(item: any): CompanyModel {
    const company = new CompanyModel();
    if (item) {
      company.compCode = item.compCode;
      company.compName = item.compName;
      company.compPhone = item.compPhone;
      company.contactPersonName = item.contactPersonName;
      company.contactPersonPhone = item.contactPersonPhone;
      company.contactPersonEmail = item.contactPersonEmail;
      company.compAddress = item.compAddress;
      company.altContactPerson = item.altContactPerson;
      company.altContactPhone = item.altContactPhone;
      company.altContactEmail = item.altContactEmail;
      company.panTan = item.panTan;
      company.compRegCode = item.compRegCode;
      company.serviceTax = item.serviceTax;

      company.mouSigned = item.mouSigned;
      company.compStatus = item.compStatus;
      company.compWebsite = item.compWebsite;
      company.effectiveDate = item.effectiveDate;
      company.expirationDate = item.expirationDate;
      company.createdAt = item.createdAt;
      company.updatedAt = item.updatedAt;
    }
    return company;
  }
}
