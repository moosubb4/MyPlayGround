import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyenterComponent } from './keyenter.component';

describe('KeyenterComponent', () => {
  let component: KeyenterComponent;
  let fixture: ComponentFixture<KeyenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
