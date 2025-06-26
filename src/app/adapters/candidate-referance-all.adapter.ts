import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { CandidateReferanceInfoModelAll } from '../models/candidate-referance-info-all.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateReferanceInfoAdapterAll
  implements Adapter<CandidateReferanceInfoModelAll>
{
  adapt(item: any): CandidateReferanceInfoModelAll {
    const referinfo = new CandidateReferanceInfoModelAll();
    if (item) {
      referinfo.candidateRefId = item.candidateRefId;
      referinfo.bssId = item.bssId;
      referinfo.compCode = item.compCode;
      referinfo.jdId = item.jdId;
      referinfo.candidateStatus = item.candidateStatus;
      referinfo.companyStatus = item.companyStatus;
      referinfo.joinedStatus = item.joinedStatus;
      referinfo.joinedDate = item.joinedDate;
      referinfo.offeredCtc = item.offeredCtc;
      referinfo.interviewAvailability = item.interviewAvailability;
      referinfo.interviewDate = item.interviewDate;
      referinfo.interviewTime = item.interviewTime;
      referinfo.comments = item.comments;
      referinfo.effectiveDate = item.effectiveDate;
      referinfo.expirationDate = item.expirationDate;
      referinfo.createdAt = item.createdAt;
      referinfo.updatedAt = item.updatedAt;
    }
    return referinfo;
  }
}
