import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material/material-module';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
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
import { CandidateReferComponent } from '../candidate-refer/candidate-refer';

@Component({
  selector: 'app-candidate-edit-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    CandidateReferComponent,
  ],
  templateUrl: './candidate-edit-component.html',
  styleUrl: './candidate-edit-component.css',
})
export class CandidateEditComponent implements OnInit {
  formName: FormGroup;
  buttonText = 'Create Candidate';
  isNewCandidate = true;
  candidateInfo: CandidateInfoModel;
  formSubscription: Subscription;
  isFormValid = false;
  company: CompanyModel[] = [];
  status: StatusModel[] = [];
  positionStatus: StatusModel[] = [];
  positionUrgency: StatusModel[] = [];
  jobDescription: JobDescriptionModel[] = [];
  candidateReferanceinfo: CandidateReferanceInfoModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotificationService,
    private route: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  async ngOnInit() {
    this.init();

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.candidateInfo = res;
        if (this.candidateInfo.bssId != null) {
          this.buttonText = 'Update Candidate';
          this.isNewCandidate = false;
        }
      });

    if (!this.isNewCandidate) {
      // await this.getCandidateReferanceData();
      this.setupForm();
    }

    this.formSubscription = this.formName.statusChanges.subscribe(() => {
      this.isFormValid = this.formName.valid;
    });
  }

  private init() {
    this.formName = this.formBuilder.group({
      phoneSearch: [''],
      emailSearch: [''],
      candidateName: [''],
      phoneNo: [''],
      position: [''],
      email: [''],
      primarySkill: [''],
      secondarySkill: [''],
      resume: [''],
      dob: [''],
      currentLocation: [''],
      currentCompany: [''],
      noticePeriod: [''],
      totalExp: ['0'],
      releventExp: ['0'],
      currentCtc: ['0'],
      expectedCtc: ['0'],
      reasonForChange: [''],
      readyToRelocate: [0],
    });
  }

  private setupForm() {
    this.formName.setValue({
      phoneSearch: [''],
      emailSearch: [''],
      candidateName: this.candidateInfo.candidateName,
      phoneNo: this.candidateInfo.phoneNo,
      position: this.candidateInfo.position,
      email: this.candidateInfo.email,
      primarySkill: this.candidateInfo.primarySkill,
      secondarySkill: this.candidateInfo.secondarySkill,
      resume: this.candidateInfo.resume,
      dob: this.candidateInfo.dob,
      currentLocation: this.candidateInfo.currentLocation,
      currentCompany: this.candidateInfo.currentCompany,
      noticePeriod: this.candidateInfo.noticePeriod,
      totalExp: this.candidateInfo.totalExp,
      releventExp: this.candidateInfo.releventExp,
      currentCtc: this.candidateInfo.currentCtc,
      expectedCtc: this.candidateInfo.expectedCtc,
      reasonForChange: this.candidateInfo.reasonForChange,
      readyToRelocate: this.candidateInfo.readyToRelocate,
    });
  }

  async search() {
    const phone = this.formName.get('phoneSearch').value;
    const email = this.formName.get('emailSearch').value;

    if (phone == null && email == null) {
      this.notifier.showWarning(
        'need Phone or  Email value to search',
        '',
        false
      );
    } else {
      const data = await this.candidateService.getCandidateByPhoneOrEmail(
        phone,
        email
      );
      if (data != null) {
        this.candidateInfo = data;
        this.buttonText = 'Update Candidate';
        this, this.setupForm();
      } else {
        this.notifier.showInfo('No candidate found', '', false);
      }
    }
  }

  async saveCandidate() {
    this.candidateInfo.candidateName = this.formName.get('candidateName').value;
    this.candidateInfo.phoneNo = this.formName.get('phoneNo').value;
    this.candidateInfo.position = this.formName.get('position').value;
    this.candidateInfo.email = this.formName.get('email').value;
    this.candidateInfo.primarySkill = this.formName.get('primarySkill').value;
    this.candidateInfo.secondarySkill =
      this.formName.get('secondarySkill').value;
    this.candidateInfo.resume = this.formName.get('resume').value;
    this.candidateInfo.dob = this.formName.get('dob').value;
    this.candidateInfo.currentLocation =
      this.formName.get('currentLocation').value;
    this.candidateInfo.currentCompany =
      this.formName.get('currentCompany').value;
    this.candidateInfo.noticePeriod = this.formName.get('noticePeriod').value;
    this.candidateInfo.totalExp = this.formName.get('totalExp').value;
    this.candidateInfo.releventExp = this.formName.get('releventExp').value;
    this.candidateInfo.currentCtc = this.formName.get('currentCtc').value;
    this.candidateInfo.expectedCtc = this.formName.get('expectedCtc').value;
    this.candidateInfo.reasonForChange =
      this.formName.get('reasonForChange').value;
    this.candidateInfo.readyToRelocate =
      this.formName.get('readyToRelocate').value;

    try {
      await this.candidateService.saveCandidateData(this.candidateInfo);
      if (this.isNewCandidate) {
        this.notifier.showSuccess(
          'Created new Candidate ' + this.candidateInfo.candidateName,
          '',
          false
        );
      } else {
        this.notifier.showSuccess(
          'updated Candidate ' + this.candidateInfo.candidateName,
          '',
          false
        );
      }
    } catch (error) {
      this.notifier.showWarning(
        'Error in creating/updating Candidate ' +
          this.candidateInfo.candidateName,
        '',
        false
      );
    }
  }
}
