import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './components/header/header';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { CompanyComponent } from './components/company-component/company-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'benchmark-project';
  showHeader: boolean;
  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    private router: Router
  ) {
    matIconRegistry.addSvgIcon(
      'menu_icon',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/menu.svg')
    );
    matIconRegistry.addSvgIcon(
      'edit_icon',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit.svg')
    );

    if (this.router.url == '/login') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
}
