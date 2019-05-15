import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStartedSectionComponent } from './get-started-section.component';

describe('GetStartedSectionComponent', () => {
  let component: GetStartedSectionComponent;
  let fixture: ComponentFixture<GetStartedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetStartedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStartedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
