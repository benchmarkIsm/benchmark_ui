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
  searchForm: FormGroup;
  candidateForm: FormGroup;

  buttonText = 'Create Candidate';
  isNewCandidate = true;
  showCandidateForm = false;

  candidateInfo: CandidateInfoModel = new CandidateInfoModel();
  isFormValid = false;
  formSubscription: Subscription;

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
          this.showCandidateForm = true;
          this.setupCandidateForm();
          this.updateValidity();
        }
      });

    this.formSubscription = this.candidateForm.valueChanges.subscribe(() => {
      this.isFormValid = this.candidateForm.valid;
    });
  }

  private initForms() {
    this.searchForm = this.fb.group(
      {
        phoneSearch: [''],
        emailSearch: [''],
      },
      { validators: this.atLeastOneValidator }
    );

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

  private atLeastOneValidator(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const phone = group.get('phoneSearch')?.value;
    const email = group.get('emailSearch')?.value;
    return phone || email ? null : { required: true };
  }

  private setupCandidateForm() {
    this.candidateForm.patchValue({ ...this.candidateInfo });
  }

  private updateValidity() {
    this.candidateForm.updateValueAndValidity();
    this.isFormValid = this.candidateForm.valid;
  }

  async search() {
    if (this.searchForm.invalid) {
      this.notifier.showWarning(
        'Either Phone or Email is required to search.',
        '',
        false
      );
      return;
    }

    const phone = this.searchForm.get('phoneSearch')?.value;
    const email = this.searchForm.get('emailSearch')?.value;

    const data = await this.candidateService.getCandidateByPhoneOrEmail(
      phone,
      email
    );
    if (data) {
      this.candidateInfo = data;
      this.isNewCandidate = false;
      this.buttonText = 'Update Candidate';
      this.setupCandidateForm();
    } else {
      this.candidateInfo = new CandidateInfoModel();
      this.candidateInfo.phoneNo = phone;
      this.candidateInfo.email = email;
      this.candidateForm.reset();
      this.candidateForm.patchValue({
        phoneNo: phone,
        email: email,
      });
      this.buttonText = 'Create Candidate';
    }

    this.showCandidateForm = true;
    this.updateValidity();
  }

  resetToSearch() {
    this.showCandidateForm = false;
    this.isNewCandidate = true;
    this.searchForm.reset();
    this.candidateForm.reset();
    this.candidateInfo = new CandidateInfoModel();
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
