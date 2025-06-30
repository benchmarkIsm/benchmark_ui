import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private router: Router) {}

  logout() {
    // Clear session/local storage if needed
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
