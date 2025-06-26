import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { CandidateInfoModel } from '../models/candidate-info.module';
import { CandidateReferanceInfoModel } from '../models/candidate-referance-info.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateBasicInfoAdapter implements Adapter<CandidateInfoModel> {
  adapt(item: any): CandidateInfoModel {
    const basinInfo = new CandidateInfoModel();
    if (item) {
      basinInfo.bssId = item.bssId;
      basinInfo.candidateName = item.candidateName;
      basinInfo.phoneNo = item.phoneNo;
      basinInfo.email = item.email;
      basinInfo.primarySkill = item.primarySkill;
      basinInfo.secondarySkill = item.secondarySkill;
      basinInfo.position = item.position;
      basinInfo.resume = item.resume;
      basinInfo.dob = item.dob;
      basinInfo.currentLocation = item.currentLocation;
      basinInfo.currentCompany = item.currentCompany;
      basinInfo.noticePeriod = item.noticePeriod;
      basinInfo.totalExp = item.totalExp;
      basinInfo.releventExp = item.releventExp;
      basinInfo.currentCtc = item.currentCtc;
      basinInfo.expectedCtc = item.expectedCtc;
      basinInfo.reasonForChange = item.reasonForChange;
      basinInfo.readyToRelocate = item.readyToRelocate;
      basinInfo.createdAt = item.createdAt;
      basinInfo.updatedAt = item.updatedAt;
    }
    return basinInfo;
  }
}
