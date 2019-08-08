import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementAtComponent } from './element-at.component';

describe('ElementAtComponent', () => {
  let component: ElementAtComponent;
  let fixture: ComponentFixture<ElementAtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementAtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
