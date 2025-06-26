import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class CompanyTreeService {
  transformDataToTree(data: any[]): any[] {
    const treeMap: { [key: string]: any } = {};

    data.forEach((job) => {
      const companyName = job.company.compName;
      const jobTitle = job.jobPositionTitle;

      if (!treeMap[companyName]) {
        treeMap[companyName] = {
          name: companyName,
          children: [],
        };
      }

      treeMap[companyName].children.push({
        name: jobTitle,
      });
    });

    return Object.values(treeMap);
  }
}
