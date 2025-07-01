import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMou } from './company-mou';

describe('CompanyMou', () => {
  let component: CompanyMou;
  let fixture: ComponentFixture<CompanyMou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyMou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
