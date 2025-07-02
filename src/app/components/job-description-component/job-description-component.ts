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
import { JobDescriptionModel } from '../../models/job-description.model';
import { JobDescriptionService } from '../../services/job-description.service';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-job-description-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTable,
    MatCard,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    RouterModule,
  ],
  templateUrl: './job-description-component.html',
  styleUrl: './job-description-component.css',
})
export class JobDescriptionComponent {
  jd: JobDescriptionModel[] = [];
  dataSource: MatTableDataSource<JobDescriptionModel>;
  tableColumns: string[] = [
    'compid',
    'jobPositionTitle',
    'positionStatus',
    'urgencyStatus',
    'experienceFrom',
    'experienceTo',
    'edit_action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private jdService: JobDescriptionService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getjobList();
    this.dataSource = new MatTableDataSource(this.jd);
    this.cdr.detectChanges();
  }

  async getjobList() {
    this.jd = await this.jdService.getAllJD();
  }

  // addJD(){
  //   this.router(['machines']);

  // }
}
