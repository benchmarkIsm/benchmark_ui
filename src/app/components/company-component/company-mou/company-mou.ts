import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material-module';

interface MouEntry {
  expFrom: number;
  expTo: number;
  percentage: number;
}

@Component({
  selector: 'app-company-mou',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './company-mou.html',
  styleUrls: ['./company-mou.css'],
})
export class CompanyMouComponent {
  displayedColumns: string[] = ['expFrom', 'expTo', 'percentage', 'actions'];
  dataSource = new MatTableDataSource<MouEntry>([]);
  mouForm!: FormGroup;
  editIndex: number | null = null;
  isEditing = false;
  buttonText = 'Submit';

  ngOnInit(): void {
    this.mouForm = this.fb.group({
      expFrom: [null, [Validators.required]],
      expTo: [null, [Validators.required]],
      percentage: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyMouComponent>
  ) {}

  onSubmit(): void {
    if (this.mouForm.invalid) return;
    const entry = this.mouForm.value as MouEntry;

    if (this.isEditing && this.editIndex !== null) {
      const updated = [...this.dataSource.data];
      updated[this.editIndex] = entry;
      this.dataSource.data = updated;
      this.isEditing = false;
      this.editIndex = null;
      this.buttonText = 'Submit';
    } else {
      this.dataSource.data = [...this.dataSource.data, entry];
    }

    this.mouForm.reset();
  }

  onEdit(row: MouEntry): void {
    this.mouForm.setValue({
      expFrom: row.expFrom,
      expTo: row.expTo,
      percentage: row.percentage,
    });
    this.editIndex = this.dataSource.data.indexOf(row);
    this.isEditing = true;
    this.buttonText = 'Update';
  }
  onDelete(row: MouEntry): void {
    this.dataSource.data = this.dataSource.data.filter((item) => item !== row);
  }

  close(): void {
    this.dialogRef.close();
  }
}
