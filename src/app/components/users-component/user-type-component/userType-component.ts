import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { UserRoleDialogComponent } from '../user-role-dialog/user-role-dialog';

@Component({
  selector: 'app-user-type',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './userType-component.html',
  styleUrl: './userType-component.css',
})
export class UserTypeComponent implements OnInit {
  columns = ['id', 'type', 'name', 'action'];
  userTypes = [
    { id: 1, name: 'Operator', type: 'operator' },
    { id: 2, name: 'Manager', type: 'manager' },
    { id: 3, name: 'Admin', type: 'admin' },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openRoleDialog(userType: any) {
    const dialogRef = this.dialog.open(UserRoleDialogComponent, {
      width: '600px',
      data: { userType },
    });

    dialogRef.afterClosed().subscribe((selectedRoles) => {
      if (selectedRoles?.length) {
        console.log('Submitted roles:', selectedRoles);
        // Handle save to backend
      }
    });
  }
}
