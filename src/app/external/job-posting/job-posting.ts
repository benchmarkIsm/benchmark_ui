import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ApplyJobsDialogComponent } from '../apply-jobs-dialog/apply-jobs-dialog';
import { JobDescriptionService } from '../../services/job-description.service';

@Component({
  selector: 'app-job-posting',
  standalone: true,
  templateUrl: './job-posting.html',
  styleUrl: './job-posting.css',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
})
export class JobPostingComponent implements OnInit {
  jobs: any[] = [];

  constructor(
    private dialog: MatDialog,
    private jobService: JobDescriptionService
  ) {}

  async ngOnInit() {
    this.jobs = await this.jobService.getAllJD();
  }

  openDialog(job: any) {
    this.dialog.open(ApplyJobsDialogComponent, {
      width: '90vw',
      data: job,
    });
  }
}
