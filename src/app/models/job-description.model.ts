import { CompanyModel } from './company.model';
export class JobDescriptionModel {
  jdId: number;
  company: CompanyModel;
  jobPositionTitle: string;
  experienceFrom: number;
  experienceTo: number;
  description: string;
  responsibility: string;
  skillset: string;
  pkgRangeFrom: string;
  pkgRangeTo: string;
  positionStatus: string;
  positionUrgency: string;

  effectiveDate: Date;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
