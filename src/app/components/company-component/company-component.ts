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
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { CompanyEditDioloag } from './company-edit-dioloag/company-edit-dioloag';

@Component({
  selector: 'app-company-component',
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
  templateUrl: './company-component.html',
  styleUrl: './company-component.css',
})
export class CompanyComponent implements OnInit {
  company: CompanyModel[] = [];
  dataSource: MatTableDataSource<CompanyModel>;
  tableColumns: string[] = [
    'compName',
    'contactPersonName',
    'contactPersonPhone',
    'contactPersonEmail',
    'status',
    'edit_action',
  ];

  constructor(
    private companyService: CompanyService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getCompanyList();
    this.dataSource = new MatTableDataSource(this.company);
    this.cdr.detectChanges();
  }

  async getCompanyList() {
    this.company = await this.companyService.getAllCompanies();
  }

  openDialogForCompanyEdit(companyToEdit: CompanyModel) {
    const dialogRef = this.dialog.open(CompanyEditDioloag, {
      data: companyToEdit,
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.ngOnInit();
      }
    });
  }

  openDialogForCompanyAdd() {
    const dialogRef = this.dialog.open(CompanyEditDioloag, {
      disableClose: true,
      autoFocus: false,
      //width: '300px'
    });

    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.ngOnInit();
      }
    });
  }
}
