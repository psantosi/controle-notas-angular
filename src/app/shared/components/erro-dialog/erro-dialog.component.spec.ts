import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroDialogComponent } from './erro-dialog.component';

describe('ErroDialogComponent', () => {
  let component: ErroDialogComponent;
  let fixture: ComponentFixture<ErroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
