import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTableModule,
  MatRowDef,
  MatTable,
  MatCellDef,
  MatHeaderRowDef,
  MatTableDataSource,
  MatHeaderCellDef,
  MatColumnDef,
} from '@angular/material/table';

import { CandidateInfoModel } from '../../models/candidate-info.module';
import { CandidateService } from '../../services/candidate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatTable,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    RouterModule,
  ],
  templateUrl: './candidate-component.html',
  styleUrl: './candidate-component.css',
})
export class CandidateComponent implements OnInit {
  candidateBasinInfo: CandidateInfoModel[] = [];
  dataSource: MatTableDataSource<CandidateInfoModel>;
  tableColumns: string[] = [
    'candidateName',
    'phoneNo',
    'email',
    'position',
    'currentLocation',
    'totalExp',
    'currentCtc',
    'edit_action',
  ];

  constructor(
    private candidateService: CandidateService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getCandidateList();
    this.dataSource = new MatTableDataSource(this.candidateBasinInfo);
    this.cdr.detectChanges();
  }

  async getCandidateList() {
    this.candidateBasinInfo =
      await this.candidateService.getAllCandidatesBasicInfo();
  }
}
