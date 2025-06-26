import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriotionEditComponent } from './job-description-edit-component';

describe('JobDescriotionEditComponent', () => {
  let component: JobDescriotionEditComponent;
  let fixture: ComponentFixture<JobDescriotionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDescriotionEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDescriotionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
