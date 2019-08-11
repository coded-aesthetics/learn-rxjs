import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreElementsComponent } from './ignore-elements.component';

describe('IgnoreElementsComponent', () => {
  let component: IgnoreElementsComponent;
  let fixture: ComponentFixture<IgnoreElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgnoreElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
