import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeComponent } from './userType-component';

describe('UserTypeComponent', () => {
  let component: UserTypeComponent;
  let fixture: ComponentFixture<UserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
