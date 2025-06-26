import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyModel } from '../../../models/company.model';
import { StatusModel } from '../../../models/status.model';
import { CompanyService } from '../../../services/company.service';
import { NotificationService } from '../../../services/notification.service';
import { StatusService } from '../../../services/status.service';
import { CompanyEditDioloag } from '../../company-component/company-edit-dioloag/company-edit-dioloag';
import { MaterialModule } from '../../../material/material-module';
import { CandidateReferanceInfo } from '../candidate-refer/candidate-refer';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-edit-referance-dialog',
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-referance-dialog.html',
  styleUrl: './edit-referance-dialog.css',
})
export class EditReferanceDialog implements OnInit {
  editReferanceForm: FormGroup;
  companyData: CompanyModel;
  title = '';
  actionButtonText = '';
  formSubscription: Subscription;
  isFormValid = false;
  isNewCompany = false;
  status: StatusModel[] = [];
  compStatusList: StatusModel[] = [];
  candidateStatusList: StatusModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CompanyEditDioloag>,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
    private notifier: NotificationService,
    private statusService: StatusService,
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: CandidateReferanceInfo
  ) {
    console.log('data', data);
  }
  async ngOnInit() {
    this.init();
    await this.getAllStatus();

    this.setupForm();

    this.formSubscription = this.editReferanceForm.statusChanges.subscribe(
      () => {
        this.isFormValid = this.editReferanceForm.valid;
      }
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  async getAllStatus() {
    this.status = await this.statusService.getAllStatus();
    this.compStatusList = this.status.filter(
      (row) => row.statusGenrated == 'Company Status For Candidate'
    );
    this.candidateStatusList = this.status.filter(
      (row) => row.statusGenrated == 'Candidate Reference'
    );
  }

  private init() {
    this.editReferanceForm = this.formBuilder.group({
      bssId: [''],
      candidateRefId: [''],
      candidateStatus: [''],
      comments: [''],
      compCode: [''],
      compName: [''],
      companyStatus: [''],
      effectiveDate: [''],
      expirationDate: [''],
      interviewAvailability: [''],
      interviewDate: [''],
      interviewTime: [''],
      jdId: [''],
      jobDescription: [''],
      joinedDate: [''],
      joinedStatus: [''],
      offeredCtc: [''],
    });
  }

  private setupForm() {
    for (let i: number = 0; i < this.candidateStatusList.length; i++) {
      if (
        this.candidateStatusList[i].statusName === this.data.candidateStatus
      ) {
        this.editReferanceForm.patchValue({
          candidateStatus: this.candidateStatusList[i],
        });
      }
    }
    for (let i: number = 0; i < this.compStatusList.length; i++) {
      if (this.compStatusList[i].statusName === this.data.companyStatus) {
        this.editReferanceForm.patchValue({
          companyStatus: this.compStatusList[i],
        });
      }
    }

    const {
      createdAt,
      updatedAt,
      candidateStatus,
      companyStatus,
      ...formData
    } = this.data;
    this.editReferanceForm.patchValue({ ...formData });
  }

  cancel() {
    this.dialogRef.close();
  }

  async save() {
    try {
      const { candidateStatus, companyStatus, ...rest } =
        this.editReferanceForm.value;
      const requestData = {
        candidateStatus: candidateStatus.statusName,
        companyStatus: companyStatus.statusName,
        ...rest,
      };
      await this.candidateService.referCandidate(requestData);
      this.dialogRef.close(true);
      this.notifier.showSuccess('Candidate referred successfully.', '', false);
    } catch (error) {
      console.error('Error referring candidate:', error);
      this.notifier.showError('Error referring candidate:', error, false);
    }
  }
}
