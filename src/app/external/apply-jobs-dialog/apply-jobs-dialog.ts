import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-apply-jobs-dialog',
  standalone: true,
  templateUrl: './apply-jobs-dialog.html',
  styleUrl: './apply-jobs-dialog.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class ApplyJobsDialogComponent {
  applyForm: FormGroup;
  descriptionList: string[] = [];
  responsibilityList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyJobsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.applyForm = this.fb.group({
      candidateName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      skills: ['', Validators.required],
      experience: ['', Validators.required],
      relevantExperience: ['', Validators.required],
      resume: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data?.description) {
      this.descriptionList = this.splitBulletPoints(this.data.description);
    }

    if (this.data?.responsibility) {
      this.responsibilityList = this.splitBulletPoints(
        this.data.responsibility
      );
    }
  }

  private splitBulletPoints(text: string): string[] {
    // Split on newline with or without bullet and clean up spaces
    return text
      .split(/\n•\s*|\n\s*•\s*|•\s*/g)
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.length > 0 &&
          line.toLowerCase() !== 'key responsibilities' &&
          line.toLowerCase() !== 'required skills'
      );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.applyForm.patchValue({ resume: file });
  }

  onSubmit() {
    if (this.applyForm.valid) {
      console.log('Submitted Data:', this.applyForm.value);
      this.dialogRef.close(this.applyForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
