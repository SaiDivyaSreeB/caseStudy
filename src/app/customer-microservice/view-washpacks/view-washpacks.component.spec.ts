import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWashpacksComponent } from './view-washpacks.component';

describe('ViewWashpacksComponent', () => {
  let component: ViewWashpacksComponent;
  let fixture: ComponentFixture<ViewWashpacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWashpacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWashpacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
