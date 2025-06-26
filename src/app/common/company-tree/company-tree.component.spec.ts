import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTreeComponent } from './company-tree.component';

describe('CompanyTree', () => {
  let component: CompanyTreeComponent;
  let fixture: ComponentFixture<CompanyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
