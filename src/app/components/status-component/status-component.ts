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
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { StatusModel } from '../../models/status.model';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-status-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatCard,
    MatTable,
    MatPaginator,
    MatPaginatorModule,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
  ],
  templateUrl: './status-component.html',
  styleUrl: './status-component.css',
})
export class StatusComponent {
  status: StatusModel[] = [];
  dataSource: MatTableDataSource<StatusModel>;
  tableColumns: string[] = ['statusName', 'generatedFor', 'edit_action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private statusService: StatusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    await this.getCompanyList();
    this.dataSource = new MatTableDataSource(this.status);
    this.cdr.detectChanges();
  }

  async getCompanyList() {
    this.status = await this.statusService.getAllStatus();
  }
}
