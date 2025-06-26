import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
