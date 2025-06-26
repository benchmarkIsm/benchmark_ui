import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { CandidateReferanceInfoModel } from '../models/candidate-referance-info.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateReferanceInfoAdapter
  implements Adapter<CandidateReferanceInfoModel>
{
  adapt(item: any): CandidateReferanceInfoModel {
    const referinfo = new CandidateReferanceInfoModel();
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
