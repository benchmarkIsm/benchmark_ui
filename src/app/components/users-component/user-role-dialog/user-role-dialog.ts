import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-role-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './user-role-dialog.html',
  styleUrl: './user-role-dialog.css',
})
export class UserRoleDialogComponent {
  columns = ['select', 'id', 'name', 'description'];
  roles = [
    {
      id: 1,
      name: 'viewCandidate',
      description: 'candidate view only',
      selected: false,
    },
    {
      id: 2,
      name: 'editCandidate',
      description: 'edit candidate info',
      selected: false,
    },
    {
      id: 3,
      name: 'deleteCandidate',
      description: 'delete candidate data',
      selected: false,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isAllSelected(): boolean {
    return this.roles.every((role) => role.selected);
  }

  toggleAllSelection(checked: boolean) {
    this.roles.forEach((role) => (role.selected = checked));
  }

  submit() {
    const selectedRoles = this.roles.filter((role) => role.selected);
    this.dialogRef.close(selectedRoles);
  }
}
