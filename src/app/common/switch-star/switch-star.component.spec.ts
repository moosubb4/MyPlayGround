import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchStarComponent } from './switch-star.component';

describe('SwitchStarComponent', () => {
  let component: SwitchStarComponent;
  let fixture: ComponentFixture<SwitchStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
