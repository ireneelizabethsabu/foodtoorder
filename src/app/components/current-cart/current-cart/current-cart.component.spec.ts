import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCartComponent } from './current-cart.component';

describe('CurrentCartComponent', () => {
  let component: CurrentCartComponent;
  let fixture: ComponentFixture<CurrentCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentCartComponent]
    });
    fixture = TestBed.createComponent(CurrentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
