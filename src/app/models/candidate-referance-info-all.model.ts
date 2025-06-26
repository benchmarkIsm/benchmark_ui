import { Time } from '@angular/common';
import { CandidateInfoModel } from './candidate-info.module';
import { CompanyModel } from './company.model';
import { JobDescriptionModel } from './job-description.model';

export class CandidateReferanceInfoModelAll {
  candidateRefId?: number;
  bssId: CandidateInfoModel;
  compCode: CompanyModel;
  jdId: JobDescriptionModel;
  candidateStatus: string;
  companyStatus: string;
  joinedStatus?: string;
  joinedDate?: Date;
  offeredCtc?: string;
  interviewAvailability?: string;
  interviewDate?: Date;
  interviewTime?: string;
  comments?: string;

  effectiveDate?: Date;
  expirationDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
