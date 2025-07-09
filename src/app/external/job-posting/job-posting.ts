import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ApplyJobsDialogComponent } from '../apply-jobs-dialog/apply-jobs-dialog';
import { JobDescriptionService } from '../../services/job-description.service';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-job-posting',
  standalone: true,
  templateUrl: './job-posting.html',
  styleUrl: './job-posting.css',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MaterialModule,
  ],
})
export class JobPostingComponent implements OnInit {
  jobs: any[] = [];

  constructor(
    private dialog: MatDialog,
    private jobService: JobDescriptionService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.jobs = await this.jobService.getAllJD();
    this.cdr.detectChanges();
  }

  openDialog(job: any) {
    this.dialog.open(ApplyJobsDialogComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: job,
    });
  }
}
