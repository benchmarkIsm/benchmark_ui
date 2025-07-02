import { Time } from '@angular/common';
import { CandidateInfoModel } from './candidate-info.module';
import { CompanyModel } from './company.model';
import { JobDescriptionModel } from './job-description.model';
import { CandidateReferanceInfoModel } from './candidate-referance-info.model';
export class CandidateReferanceInfoModelAll {
  candidateRefId: CandidateReferanceInfoModel;
  bssId: CandidateInfoModel;
  jdId: JobDescriptionModel;
}
