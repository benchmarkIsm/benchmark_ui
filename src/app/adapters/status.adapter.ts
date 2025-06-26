import { Injectable } from '@angular/core';
import { Adapter } from './adapter.interface';
import { CompanyModel } from '../models/company.model';
import { StatusModel } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusAdapter implements Adapter<StatusModel> {
  adapt(item: any): StatusModel {
    const status = new StatusModel();
    if (item) {
      status.statusId = item.statusId;
      status.statusName = item.statusName;
      status.statusGenrated = item.statusGenrated;

      status.createdAt = item.createdAt;
      status.updatedAt = item.updatedAt;
    }
    return status;
  }
}
