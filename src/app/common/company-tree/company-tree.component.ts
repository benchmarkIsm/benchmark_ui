import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { JobDescriptionService } from '../../services/job-description.service';
import CompanyTreeService from '../../services/Company-tree.service';
import { CandidateService } from '../../services/candidate.service';
import { Router } from '@angular/router';

interface Node {
  id: number | string;
  name: string;
  description?: string;
  route?: string;
  children?: Node[];
}

@Component({
  standalone: true,
  selector: 'app-company-tree',
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.css'],
  imports: [CommonModule, MatTreeModule, MatIconModule],
})
export class CompanyTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<Node>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  selectedRoute: string | null = null;

  constructor(
    private companyTreeService: CompanyTreeService,
    private jdService: JobDescriptionService,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const jds = await this.jdService.getAllJD();
    const candidates = await this.candidateService.getAllReferanceData();

    const tree = this.companyTreeService.transformDataToTree(jds, candidates);
    this.dataSource.data = tree;
    this.treeControl.dataNodes = tree;
  }

  hasChild = (_: number, node: Node) =>
    !!node.children && node.children.length > 0;

  navigate(selected: string): void {
    this.selectedRoute = selected;
    console.log('Navigated to ID:', selected);
    // You can add routing logic here if desired
  }
}
