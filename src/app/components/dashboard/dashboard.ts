import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MatCardModule } from '@angular/material/card';
import { CompanyTreeComponent } from '../../common/company-tree/company-tree.component';
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [MatCardModule, CompanyTreeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
