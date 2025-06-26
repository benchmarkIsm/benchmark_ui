import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material-module';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CompanyModel } from '../../../models/company.model';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { NotificationService } from '../../../services/notification.service';
import { StatusService } from '../../../services/status.service';
import { StatusModel } from '../../../models/status.model';

@Component({
  selector: 'app-company-edit-dioloag',
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './company-edit-dioloag.html',
  styleUrl: './company-edit-dioloag.css',
})
export class CompanyEditDioloag implements OnInit {
  formName: FormGroup;
  companyData: CompanyModel;
  title = '';
  actionButtonText = '';
  formSubscription: Subscription;
  isFormValid = false;
  isNewCompany = false;
  status: StatusModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CompanyEditDioloag>,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
    private notifier: NotificationService,
    private statusService: StatusService,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel
  ) {
    if (data) {
      this.companyData = data;
      this.title = 'Edit ' + this.companyData.compName;
      this.actionButtonText = 'Update';
      this.isNewCompany = false;
    } else {
      this.companyData = new CompanyModel();
      this.title = 'Add New Company';
      this.actionButtonText = 'Create';
      this.isNewCompany = true;
    }
  }
  async ngOnInit() {
    this.init();
    await this.getAllStatus();
    if (!this.isNewCompany) {
      this.setupForm();
    }

    this.formSubscription = this.formName.statusChanges.subscribe(() => {
      this.isFormValid = this.formName.valid;
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  async getAllStatus() {
    const status = await this.statusService.getAllStatus();
    this.status = status.filter((row) => row.statusGenrated == 'Company');
  }

  private init() {
    this.formName = this.formBuilder.group({
      compName: [''],
      compPhone: [''],
      contactPersonName: [''],
      contactPersonPhone: [''],
      contactPersonEmail: [''],
      altContactPerson: [''],
      altContactPhone: [''],
      altContactEmail: [''],
      compAddress: [''],
      compWebsite: [''],
      panTan: [''],
      compRegCode: [''],
      serviceTax: [''],
      mouSigned: [false],
      compStatus: [''],
    });
  }

  private setupForm() {
    let statusId = 0;
    for (let i = 0; i < this.status.length; i++) {
      if (parseInt(this.companyData.compStatus) == this.status[i].statusId) {
        statusId = i;
      }
    }
    this.formName.setValue({
      compName: this.companyData.compName,
      compPhone: this.companyData.compPhone || ' ',
      contactPersonName: this.companyData.contactPersonName || ' ',
      contactPersonPhone: this.companyData.contactPersonPhone || ' ',
      contactPersonEmail: this.companyData.contactPersonEmail || ' ',
      altContactPerson: this.companyData.altContactPerson || ' ',
      altContactPhone: this.companyData.altContactPhone || ' ',
      altContactEmail: this.companyData.altContactEmail || ' ',
      compAddress: this.companyData.compAddress || ' ',
      compWebsite: this.companyData.compWebsite || ' ',
      panTan: this.companyData.panTan || ' ',
      compRegCode: this.companyData.compRegCode || ' ',
      serviceTax: this.companyData.serviceTax || ' ',
      mouSigned: this.companyData.mouSigned === 1 ? true : false,
      compStatus: this.status[statusId],
    });
  }

  cancel() {
    // console.log('CANCEL');
    this.dialogRef.close();
  }

  public getIndexfromStatus(input: StatusModel): any {
    for (let i = 0; i < this.status.length; i++) {
      if (
        this.status[i].statusName == input.statusName &&
        this.status[i].statusGenrated == input.statusGenrated
      ) {
        return this.status[i].statusId;
      }
    }
  }

  async save() {
    this.companyData.compName = this.formName.get('compName').value;
    this.companyData.compPhone = this.formName.get('compPhone').value;
    this.companyData.contactPersonName =
      this.formName.get('contactPersonName').value;
    this.companyData.contactPersonPhone =
      this.formName.get('contactPersonPhone').value;
    this.companyData.contactPersonEmail =
      this.formName.get('contactPersonEmail').value;
    this.companyData.compAddress = this.formName.get('compAddress').value;
    this.companyData.altContactPerson =
      this.formName.get('altContactPerson').value;
    this.companyData.altContactPhone =
      this.formName.get('altContactPhone').value;

    this.companyData.altContactEmail =
      this.formName.get('altContactEmail').value;
    this.companyData.panTan = this.formName.get('panTan').value;

    this.companyData.compRegCode = this.formName.get('compRegCode').value;
    this.companyData.serviceTax = this.formName.get('serviceTax').value;
    this.companyData.compWebsite = this.formName.get('compWebsite').value;
    const status = this.formName.get('compStatus').value;
    this.companyData.compStatus = this.getIndexfromStatus(status);
    this.companyData.mouSigned =
      this.formName.get('mouSigned').value === false ? 0 : 1;

    try {
      await this.companyService.saveCompany(this.companyData);
      if (this.isNewCompany) {
        this.notifier.showSuccess(
          'Created new company ' + this.companyData.compName,
          '',
          false
        );
      } else {
        this.notifier.showSuccess(
          'Company ' + this.companyData.compName + ' has been updated',
          '',
          false
        );
      }
      this.dialogRef.close(true);
    } catch (error) {
      if (this.isNewCompany) {
        this.notifier.showSuccess(
          'failed to create company ' + this.companyData.compName,
          '',
          false
        );
      } else {
        this.notifier.showSuccess(
          'failed to update company ' + this.companyData.compName,
          '',
          false
        );
      }
    }
  }
}
