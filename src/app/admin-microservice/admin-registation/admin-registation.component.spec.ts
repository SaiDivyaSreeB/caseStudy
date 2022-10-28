import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistationComponent } from './admin-registation.component';

describe('AdminRegistationComponent', () => {
  let component: AdminRegistationComponent;
  let fixture: ComponentFixture<AdminRegistationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
