import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class CompanyTreeService {
  transformDataToTree(jds: any[], candidates: any[]): any[] {
    const companyMap: { [compName: string]: any } = {};

    jds.forEach((jd) => {
      const compName = jd.company.compName;
      const jdId = jd.jdId;
      const jobTitle = jd.jobPositionTitle;

      if (!companyMap[compName]) {
        companyMap[compName] = {
          id: jd.company.compCode,
          name: compName,
          route: '/company',
          children: [],
        };
      }

      // Filter candidates belonging to this JD
      const jdCandidates = candidates
        .filter((c) => c.jdId.jdId === jdId)
        .map((c) => ({
          id: c.bssId.bssId,
          name: c.bssId.candidateName.trim(),
          route: '/candidate',
          children: [],
        }));

      const jdNode = {
        id: jdId,
        name: jobTitle,
        route: '/jobDescription',
        children: jdCandidates,
      };

      companyMap[compName].children.push(jdNode);
    });

    return Object.values(companyMap);
  }
}
