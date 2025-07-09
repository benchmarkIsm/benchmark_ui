import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material/material-module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CandidateInfoModel } from '../../../models/candidate-info.module';
import { CandidateService } from '../../../services/candidate.service';
import { map, Subscription } from 'rxjs';

import { CompanyModel } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';

import { JobDescriptionModel } from '../../../models/job-description.model';
import { JobDescriptionService } from '../../../services/job-description.service';

import { StatusModel } from '../../../models/status.model';
import { StatusService } from '../../../services/status.service';

import { CandidateReferanceInfoModel } from '../../../models/candidate-referance-info.model';
import { NgForOf } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { EditReferanceDialog } from '../edit-referance-dialog/edit-referance-dialog';
import { CandidateReferanceInfoModelAll } from '../../../models/candidate-referance-info-all.model';
import { CoreService } from '../../../services/core-api.service';
export interface CandidateReferanceInfo extends CandidateReferanceInfoModel {
  compName: string;
  jobDescription: string;
}

@Component({
  selector: 'app-candidate-refer',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './candidate-refer.html',
  styleUrl: './candidate-refer.css',
})
export class CandidateReferComponent implements OnInit, OnChanges {
  @Input() candidateData: CandidateInfoModel;
  referenceForm: FormGroup;
  formSubscription: Subscription;
  isFormValid = false;
  btnReferDisabled = true;
  company: CompanyModel[] = [];
  status: StatusModel[] = [];
  positionStatus: StatusModel[] = [];
  positionUrgency: StatusModel[] = [];
  jobDescription: JobDescriptionModel[] = [];
  candidateReferanceinfo: CandidateReferanceInfo[] = [];
  jd: JobDescriptionModel;
  referenceTableColumns: string[] = [
    'compName',
    'jobDescription',
    'candidateStatus',
    'companyStatus',
    'actions',
  ];
  private dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private companyService: CompanyService,
    private statusService: StatusService,
    private jobService: JobDescriptionService,
    private cdr: ChangeDetectorRef,
    private notifier: NotificationService,
    private dialog: MatDialog,
    private coreService: CoreService
  ) {}

  async ngOnInit() {
    this.initForm();
    await this.loadInitialData();

    this.referenceForm.setValue({
      company: this.company,
      job: this.jobDescription,
      status: this.status,
    });

    this.referenceForm.get('job').disable();
    this.referenceForm.get('status').disable();
  }

  private async loadInitialData() {
    await this.getCompanyList();
    await this.getjobList();
    await this.getAllStatus();
    this.dataLoaded = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateData'] && this.candidateData?.bssId) {
      if (this.dataLoaded) {
        this.getCandidateReferanceData();
      } else {
        this.waitForDataAndFetchReferences();
      }
    }
  }

  private async waitForDataAndFetchReferences() {
    while (!this.dataLoaded) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.getCandidateReferanceData();
  }

  initForm() {
    this.referenceForm = this.formBuilder.group({
      company: [''],
      job: [''],
      status: [''],
    });
  }

  async getCandidateReferanceData() {
    const candidateRefInfo =
      await this.candidateService.getCandidateReferanceData(
        this.candidateData.bssId
      );
    this.candidateReferanceinfo = candidateRefInfo.map((ref) => {
      return {
        ...ref,
        compName:
          this.company.find((comp) => comp.compCode == ref.compCode)
            ?.compName ?? '',
        jobDescription:
          this.jobDescription.find((jd) => jd.jdId == ref.jdId)
            ?.jobPositionTitle ?? '',
      };
    });
    this.cdr.detectChanges();
  }

  async getCompanyList() {
    this.company = await this.companyService.getAllCompanies();
  }

  async getAllStatus() {
    const status = await this.statusService.getAllStatus();
    this.status = status;
    this.positionStatus = status.filter(
      (row) => row.statusGenrated == 'JD Position'
    );
    this.positionUrgency = status.filter(
      (row) => row.statusGenrated == 'JD Position Urgency'
    );
  }

  async getjobList() {
    this.jobDescription = await this.jobService.getAllJD();
  }

  onCompanyChange(event: any) {
    this.jobDescription = this.jobDescription.filter(
      (row) => row.company.compCode == event.value
    );
    this.status = this.status.filter(
      (row) => row.statusGenrated == 'Candidate Reference'
    );
    this.referenceForm.get('job').enable();
    this.referenceForm.get('status').enable();
    this.btnReferDisabled = false;
  }

  async submitReference() {
    if (this.referenceForm.invalid) {
      return;
    }

    const referalData: CandidateReferanceInfoModel = {
      bssId: this.candidateData.bssId,
      compCode: this.referenceForm.value.company,
      jdId: this.referenceForm.value.job,
      candidateStatus: this.referenceForm.value.status,
      companyStatus: 'New',
    };

    try {
      await this.candidateService.referCandidate(referalData);
      this.getCandidateReferanceData();
      this.notifier.showSuccess('Candidate referred successfully.', '', false);
    } catch (error) {
      console.error('Error referring candidate:', error);
      this.notifier.showError('Error referring candidate:', error, false);
    }
  }

  editReference(ref: CandidateReferanceInfo): void {
    console.log('ref', ref);
    const dialogRef = this.dialog.open(EditReferanceDialog, {
      disableClose: true,
      autoFocus: false,
      data: ref,
    });

    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.ngOnInit();
        this.getCandidateReferanceData();
      }
    });
  }

  deleteReference(ref: any): void {
    // delete the selected reference
  }

  async sendMail(ref: CandidateReferanceInfo) {
    const mailData = new CandidateReferanceInfoModelAll();
    mailData.candidateRefId = ref;
    mailData.bssId = this.candidateData;
    mailData.jdId = this.getJobDetails(ref.jdId);

    const value = await this.coreService.sendJobEmail(mailData);
    if (value) {
      this.notifier.showSuccess('Email sent successfully.', '', false);
    } else {
      this.notifier.showSuccess('Error in sending email.', '', false);
    }
  }

  public getJobDetails(jdId: number): JobDescriptionModel {
    for (let i = 0; i < this.jobDescription.length; i++) {
      if (this.jobDescription[i].jdId == jdId) {
        this.jd = this.jobDescription[i];
      }
    }
    return this.jd;
  }
}
