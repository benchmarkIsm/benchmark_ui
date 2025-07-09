import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterModule,
  Router,
  NavigationEnd,
} from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Header } from './components/header/header';
import { JobPostingComponent } from './external/job-posting/job-posting';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Header,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  sidenavOpened = true;
  showHeader = false;

  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    private router: Router
  ) {
    // Register icons
    matIconRegistry.addSvgIcon(
      'menu_icon',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/menu.svg')
    );
    matIconRegistry.addSvgIcon(
      'edit_icon',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit.svg')
    );

    // Use route change to set header visibility
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/login', '/home'];
        this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
