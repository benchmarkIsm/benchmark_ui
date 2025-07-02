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
      referinfo.jdId = item.jdId;
    }
    return referinfo;
  }
}
