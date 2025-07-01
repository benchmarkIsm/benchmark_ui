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
          description: compName,
          route: '/company',
          children: [],
        };
      }
      // Filter candidates belonging to this JD
      const jdCandidates = candidates
        .filter((c) => c.jdId.jdId === jdId)
        .map((c) => {
          return {
            id: c.bssId.bssId,
            name: c.bssId.candidateName.trim(),
            description:
              'Company Status: ' +
              c.companyStatus +
              ' | Candidate Status: ' +
              c.candidateStatus +
              (c.interviewDate ? ' | Interview Date: ' + c.interviewDate : ''),
            route: '/candidate',
            children: [],
          };
        });

      const jdNode = {
        id: jdId,
        name: jobTitle,
        description: jobTitle,
        route: '/jobDescription',
        children: jdCandidates,
      };

      companyMap[compName].children.push(jdNode);
    });

    return Object.values(companyMap);
  }
}
