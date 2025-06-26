import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReferanceDialog } from './edit-referance-dialog';

describe('EditReferanceDialog', () => {
  let component: EditReferanceDialog;
  let fixture: ComponentFixture<EditReferanceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReferanceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReferanceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
