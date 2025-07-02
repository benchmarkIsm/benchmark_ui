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
import { JobDescriptionModel } from '../../../models/job-description.model';
import { JobDescriptionService } from '../../../services/job-description.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { CompanyModel } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { StatusService } from '../../../services/status.service';
import { StatusModel } from '../../../models/status.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-job-description-edit-component',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job-description-edit-component.html',
  styleUrl: './job-description-edit-component.css',
})
export class JobDescriptionEditComponent implements OnInit {
  formName: FormGroup;
  company: CompanyModel[] = [];
  status: StatusModel[] = [];
  positionStatus: StatusModel[] = [];
  positionUrgency: StatusModel[] = [];
  jobDescriptionObj: JobDescriptionModel;
  buttonText = 'Create';
  isNewJD = true;

  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotificationService,
    private companyService: CompanyService,
    private statusService: StatusService,
    private jobService: JobDescriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  async ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        console.log(res);
        this.jobDescriptionObj = res;
        if (this.jobDescriptionObj.jdId != null) {
          this.buttonText = 'Update';
          this.isNewJD = false;
        }
      });

    this.init();
    await this.getCompanyList();
    await this.getAllStatus();
    if (this.jobDescriptionObj) {
      this.setupForm();
    }
  }

  private init() {
    this.formName = this.formBuilder.group({
      company: [''],
      jobPositionTitle: [''],
      experienceFrom: [''],
      experienceTo: [''],
      description: [''],
      responsibility: [''],
      skillset: [''],
      pkgRangeFrom: [''],
      pkgRangeTo: [''],
      positionStatus: [''],
      positionUrgency: [''],
    });
  }

  private setupForm() {
    let companytoSelect = 0;
    let positiontoSelect = 0;
    let urgencytoSelect = 0;
    for (let i: number = 0; i < this.company.length; i++) {
      if (this.company[i].compCode == this.jobDescriptionObj.company.compCode) {
        companytoSelect = i;
      }
    }
    for (let i: number = 0; i < this.positionStatus.length; i++) {
      if (
        this.positionStatus[i].statusName ==
        this.jobDescriptionObj.positionStatus
      ) {
        positiontoSelect = i;
      }
    }
    for (let i: number = 0; i < this.positionUrgency.length; i++) {
      if (
        this.positionUrgency[i].statusName ==
        this.jobDescriptionObj.positionUrgency
      ) {
        urgencytoSelect = i;
      }
    }
    this.formName.setValue({
      company: this.company[companytoSelect],
      jobPositionTitle: this.jobDescriptionObj.jobPositionTitle,
      experienceFrom: this.jobDescriptionObj.experienceFrom,
      experienceTo: this.jobDescriptionObj.experienceTo,
      description: this.jobDescriptionObj.description,
      responsibility: this.jobDescriptionObj.responsibility,
      skillset: this.jobDescriptionObj.skillset,
      pkgRangeFrom: this.jobDescriptionObj.pkgRangeFrom,
      pkgRangeTo: this.jobDescriptionObj.pkgRangeTo,
      positionStatus: this.positionStatus[positiontoSelect],
      positionUrgency: this.positionUrgency[urgencytoSelect],
    });
  }

  async getCompanyList() {
    this.company = await this.companyService.getAllCompanies();
  }

  async getAllStatus() {
    const status = await this.statusService.getAllStatus();
    this.positionStatus = status.filter(
      (row) => row.statusGenrated == 'JD Position'
    );
    this.positionUrgency = status.filter(
      (row) => row.statusGenrated == 'JD Position Urgency'
    );
  }

  async saveJD() {
    this.jobDescriptionObj.company = this.formName.get('company').value;
    this.jobDescriptionObj.jobPositionTitle =
      this.formName.get('jobPositionTitle').value;

    const position = this.formName.get('positionStatus').value;
    this.jobDescriptionObj.positionStatus = position.statusName;

    const urgency = this.formName.get('positionUrgency').value;
    this.jobDescriptionObj.positionUrgency = urgency.statusName;

    this.jobDescriptionObj.experienceFrom =
      +this.formName.get('experienceFrom').value;
    this.jobDescriptionObj.experienceTo =
      +this.formName.get('experienceTo').value;

    this.jobDescriptionObj.pkgRangeFrom =
      this.formName.get('pkgRangeFrom').value;
    this.jobDescriptionObj.pkgRangeTo = this.formName.get('pkgRangeTo').value;

    this.jobDescriptionObj.description = this.formName.get('description').value;
    this.jobDescriptionObj.responsibility =
      this.formName.get('responsibility').value;
    this.jobDescriptionObj.skillset = this.formName.get('skillset').value;

    try {
      await this.jobService.saveJD(this.jobDescriptionObj);
      if (this.isNewJD) {
        this.notifier.showSuccess(
          'Created new job ' + this.jobDescriptionObj.jobPositionTitle,
          '',
          false
        );
      } else {
        this.notifier.showSuccess(
          'updated job ' + this.jobDescriptionObj.jobPositionTitle,
          '',
          false
        );
      }
      this.router.navigate(['/jobDesciption']);
    } catch (error) {
      this.notifier.showWarning(
        'failed to create/update job ' +
          this.jobDescriptionObj.jobPositionTitle,
        '',
        false
      );
    }
  }

  public getStatusName(input: string, statusGenrated: string): any {
    for (let i = 0; i < this.status.length; i++) {
      if (
        this.status[i].statusName == input &&
        this.status[i].statusGenrated == statusGenrated
      ) {
        return i;
      }
    }
  }

  public getIndexfromCompany(input: string): any {
    for (let i = 0; i < this.company.length; i++) {
      if (this.company[i].compName == input) {
        return this.company[i].compCode;
      }
    }
  }
}
