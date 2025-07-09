import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleDialog } from './user-role-dialog';

describe('UserRoleDialog', () => {
  let component: UserRoleDialog;
  let fixture: ComponentFixture<UserRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
