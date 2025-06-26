import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRefer } from './candidate-refer';

describe('CandidateRefer', () => {
  let component: CandidateRefer;
  let fixture: ComponentFixture<CandidateRefer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateRefer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateRefer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
