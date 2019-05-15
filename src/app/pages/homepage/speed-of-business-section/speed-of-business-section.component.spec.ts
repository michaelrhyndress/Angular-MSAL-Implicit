import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedOfBusinessSectionComponent } from './speed-of-business-section.component';

describe('SpeedOfBusinessSectionComponent', () => {
  let component: SpeedOfBusinessSectionComponent;
  let fixture: ComponentFixture<SpeedOfBusinessSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedOfBusinessSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedOfBusinessSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
