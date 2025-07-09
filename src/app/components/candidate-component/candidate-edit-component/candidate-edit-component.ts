import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Subscription } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material-module';
import { NotificationService } from '../../../services/notification.service';
import { CandidateService } from '../../../services/candidate.service';
import { CandidateInfoModel } from '../../../models/candidate-info.module';
import { CandidateReferComponent } from '../candidate-refer/candidate-refer';

@Component({
  selector: 'app-candidate-edit-component',
  standalone: true,
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
  candidateForm: FormGroup;

  buttonText = 'Create Candidate';
  isNewCandidate = true;

  candidateInfo: CandidateInfoModel = new CandidateInfoModel();
  isFormValid = false;
  formSubscription: Subscription;
  private isFetchingCandidate = false;

  constructor(
    private fb: FormBuilder,
    private notifier: NotificationService,
    private route: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.initForms();

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.candidateInfo = res;
        if (this.candidateInfo?.bssId != null) {
          this.isNewCandidate = false;
          this.buttonText = 'Update Candidate';
          this.setupCandidateForm();
          this.updateValidity();
        }
      });

    this.formSubscription = this.candidateForm.valueChanges.subscribe(() => {
      this.isFormValid = this.candidateForm.valid;
    });
  }

  private initForms() {
    this.candidateForm = this.fb.group({
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

  private setupCandidateForm() {
    this.candidateForm.patchValue({ ...this.candidateInfo });
  }

  private updateValidity() {
    this.candidateForm.updateValueAndValidity();
    this.isFormValid = this.candidateForm.valid;
  }

  async autoSearch(type: 'phone' | 'email') {
    if (!this.isNewCandidate || this.isFetchingCandidate) return;

    const phone = this.candidateForm.get('phoneNo')?.value;
    const email = this.candidateForm.get('email')?.value;

    if (!phone && !email) return;

    // Prevent duplicate calls
    this.isFetchingCandidate = true;

    try {
      const data = await this.candidateService.getCandidateByPhoneOrEmail(
        phone,
        email
      );
      if (data) {
        this.candidateInfo = { ...data };
        this.isNewCandidate = false;
        this.buttonText = 'Update Candidate';
        this.setupCandidateForm();
        this.updateValidity();
      }
    } catch (err) {
      console.error('Error fetching candidate info:', err);
    } finally {
      this.isFetchingCandidate = false;
    }
  }

  async saveCandidate() {
    const formValue = this.candidateForm.value;
    Object.assign(this.candidateInfo, formValue);

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
        `Error in saving Candidate ${this.candidateInfo.candidateName}`,
        '',
        false
      );
    }
  }
}
