import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDevelopSectionComponent } from './design-develop-section.component';

describe('DesignDevelopSectionComponent', () => {
  let component: DesignDevelopSectionComponent;
  let fixture: ComponentFixture<DesignDevelopSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDevelopSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDevelopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
