import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { CandidateInfoModel } from '../../models/candidate-info.module';
import { CandidateService } from '../../services/candidate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatTable,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    RouterModule,
    MatPaginatorModule,
    MatPaginator,
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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private candidateService: CandidateService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getCandidateList();
    this.dataSource = new MatTableDataSource(this.candidateBasinInfo);
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  async getCandidateList() {
    this.candidateBasinInfo =
      await this.candidateService.getAllCandidatesBasicInfo();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearFilter() {
    this.dataSource.filter = '';
  }
}
