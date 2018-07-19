import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab4TestComponent } from './tab4-test.component';

describe('Tab4TestComponent Addfunc', () => {
  let component: Tab4TestComponent;
  let fixture: ComponentFixture<Tab4TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab4TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab4TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Add', () => {
    expect(component.onAdd(1, 9)).toEqual(10);
  });
});
