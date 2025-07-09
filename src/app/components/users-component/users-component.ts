import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-component',
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'userId',
    'userName',
    'fullName',
    'userEmail',
    'userMobile',
    'userStatus',
    'enableLogin',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    await this.getUserList();
  }

  async getUserList() {
    try {
      const users = await this.userService.getAllUsers();
      this.dataSource.data = users;
    } catch (err) {
      console.error('Failed to load user list', err);
    }
  }

  navigateToDetails(user: any) {
    this.router.navigate(['/edit'], { state: user });
  }
}
