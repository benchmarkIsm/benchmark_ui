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
  candidateInfo: CandidateInfoModel = new CandidateInfoModel();
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
    this.initForm();

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.candidateInfo = res;
        if (this.candidateInfo?.bssId != null) {
          this.buttonText = 'Update Candidate';
          this.isNewCandidate = false;
        }
      });

    if (!this.isNewCandidate) {
      this.setupForm();
      this.updateValidity();
    }

    // Use valueChanges instead of statusChanges for more accurate tracking
    this.formSubscription = this.formName.valueChanges.subscribe(() => {
      this.isFormValid = this.formName.valid;
    });
  }

  private initForm() {
    this.formName = this.formBuilder.group({
      phoneSearch: [''],
      emailSearch: [''],
      candidateName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      position: [''],
      email: ['', [Validators.required, Validators.email]],
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
    this.formName.patchValue({
      phoneSearch: '',
      emailSearch: '',
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

  private updateValidity() {
    this.formName.updateValueAndValidity();
    this.isFormValid = this.formName.valid;
  }

  async search() {
    const phone = this.formName.get('phoneSearch')?.value;
    const email = this.formName.get('emailSearch')?.value;

    if (!phone && !email) {
      this.notifier.showWarning(
        'Need Phone or Email value to search',
        '',
        false
      );
      return;
    }

    const data = await this.candidateService.getCandidateByPhoneOrEmail(
      phone,
      email
    );
    if (data != null) {
      this.candidateInfo = data;
      this.buttonText = 'Update Candidate';
      this.isNewCandidate = false;
      this.setupForm();
      this.updateValidity();
    } else {
      this.notifier.showInfo('No candidate found', '', false);
    }
  }

  async saveCandidate() {
    const formValue = this.formName.value;

    Object.assign(this.candidateInfo, {
      candidateName: formValue.candidateName,
      phoneNo: formValue.phoneNo,
      position: formValue.position,
      email: formValue.email,
      primarySkill: formValue.primarySkill,
      secondarySkill: formValue.secondarySkill,
      resume: formValue.resume,
      dob: formValue.dob,
      currentLocation: formValue.currentLocation,
      currentCompany: formValue.currentCompany,
      noticePeriod: formValue.noticePeriod,
      totalExp: formValue.totalExp,
      releventExp: formValue.releventExp,
      currentCtc: formValue.currentCtc,
      expectedCtc: formValue.expectedCtc,
      reasonForChange: formValue.reasonForChange,
      readyToRelocate: formValue.readyToRelocate,
    });

    try {
      await this.candidateService.saveCandidateData(this.candidateInfo);
      const action = this.isNewCandidate ? 'Created new' : 'Updated';
      this.notifier.showSuccess(
        `${action} Candidate ${this.candidateInfo.candidateName}`,
        '',
        false
      );
    } catch (error) {
      this.notifier.showWarning(
        `Error in creating/updating Candidate ${this.candidateInfo.candidateName}`,
        '',
        false
      );
    }
  }
}
