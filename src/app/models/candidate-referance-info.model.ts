import { Time } from '@angular/common';

export class CandidateReferanceInfoModel {
  candidateRefId?: number;
  bssId: number;
  compCode: number;
  jdId: number;
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
