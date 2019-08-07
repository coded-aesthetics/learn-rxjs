import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineLastestComponent } from './combine-lastest.component';

describe('CombineLastestComponent', () => {
  let component: CombineLastestComponent;
  let fixture: ComponentFixture<CombineLastestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineLastestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineLastestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
