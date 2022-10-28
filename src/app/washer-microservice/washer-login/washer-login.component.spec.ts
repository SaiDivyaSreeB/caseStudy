import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasherLoginComponent } from './washer-login.component';

describe('WasherLoginComponent', () => {
  let component: WasherLoginComponent;
  let fixture: ComponentFixture<WasherLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasherLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasherLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
