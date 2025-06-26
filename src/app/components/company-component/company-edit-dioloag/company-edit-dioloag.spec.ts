import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditDioloag } from './company-edit-dioloag';

describe('CompanyEditDioloag', () => {
  let component: CompanyEditDioloag;
  let fixture: ComponentFixture<CompanyEditDioloag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEditDioloag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEditDioloag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
