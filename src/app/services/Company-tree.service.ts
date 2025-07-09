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

      const jdCandidates = candidates
        .filter((c) => Number(c.jdId?.jdId) === Number(jdId))
        .map((c) => ({
          id: c.bssId?.bssId,
          name: c.bssId?.candidateName.trim(),
          description:
            `Company Status: ${c.companyStatus} | Candidate Status: ${c.candidateStatus}` +
            (c.interviewDate && c.interviewDate !== '1900-01-01'
              ? ` | Interview Date: ${c.interviewDate}`
              : ''),
          route: '/candidate',
          children: [],
        }));

      const jdNode = {
        id: jdId,
        name: jobTitle,
        description: jobTitle,
        route: '/jobDescription',
        children:
          jdCandidates.length > 0
            ? jdCandidates
            : [
                {
                  id: `no-candidate-${jdId}`,
                  name: 'No candidates referred yet',
                  description: '',
                  route: '',
                  children: [],
                },
              ],
      };

      companyMap[compName].children.push(jdNode);
    });

    return Object.values(companyMap);
  }
}
