import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { JobDescriptionService } from '../../services/job-description.service';
import CompanyTreeService from '../../services/Company-tree.service';

import { CandidateService } from '../../services/candidate.service';

interface Node {
  name: string;
  children?: Node[];
}

@Component({
  standalone: true,
  selector: 'app-company-tree',
  imports: [MatTreeModule, MatIconModule, CommonModule],
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.css'],
})
export class CompanyTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<Node>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  constructor(
    private companyTreeService: CompanyTreeService,
    private jdService: JobDescriptionService,
    private candidateService: CandidateService
  ) {}

  async ngOnInit(): Promise<void> {
    const jd = await this.jdService.getAllJD();
    const data = await this.candidateService.getAllReferanceData();
    this.dataSource.data = this.companyTreeService.transformDataToTree(jd);
    this.treeControl.dataNodes = this.dataSource.data;
  }

  hasChild = (_: number, node: Node) =>
    !!node.children && node.children.length > 0;
}
