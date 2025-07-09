import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobsDialog } from './apply-jobs-dialog';

describe('ApplyJobsDialog', () => {
  let component: ApplyJobsDialog;
  let fixture: ComponentFixture<ApplyJobsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyJobsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyJobsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
