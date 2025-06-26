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
import { StatusModel } from '../../models/status.model';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-status-component',
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
  ],
  templateUrl: './status-component.html',
  styleUrl: './status-component.css',
})
export class StatusComponent {
  status: StatusModel[] = [];
  dataSource: MatTableDataSource<StatusModel>;
  tableColumns: string[] = ['statusName', 'generatedFor', 'edit_action'];

  constructor(
    private statusService: StatusService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getCompanyList();
    this.dataSource = new MatTableDataSource(this.status);
    this.cdr.detectChanges();
  }

  async getCompanyList() {
    this.status = await this.statusService.getAllStatus();
  }
}
