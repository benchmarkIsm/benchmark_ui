import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { JobDescriptionModel } from '../models/job-description.model';

@Injectable({
  providedIn: 'root',
})
export class JobDescriptionAdapter implements Adapter<JobDescriptionModel> {
  adapt(item: any): JobDescriptionModel {
    const jd = new JobDescriptionModel();
    if (item) {
      jd.jdId = item.jdId;
      jd.company = item.company;
      jd.jobPositionTitle = item.jobPositionTitle;
      jd.experienceFrom = item.experienceFrom;
      jd.experienceTo = item.experienceTo;
      jd.description = item.description;
      jd.responsibility = item.responsibility;
      jd.skillset = item.skillset;
      jd.pkgRangeFrom = item.pkgRangeFrom;
      jd.pkgRangeTo = item.pkgRangeTo;
      jd.positionStatus = item.positionStatus;
      jd.positionUrgency = item.positionUrgency;

      jd.effectiveDate = item.effectiveDate;
      jd.expirationDate = item.expirationDate;
      jd.createdAt = item.createdAt;
      jd.updatedAt = item.updatedAt;
    }
    return jd;
  }
}
