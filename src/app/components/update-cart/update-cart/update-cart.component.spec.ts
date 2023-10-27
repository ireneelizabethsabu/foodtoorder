import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCartComponent } from './update-cart.component';

describe('UpdateCartComponent', () => {
  let component: UpdateCartComponent;
  let fixture: ComponentFixture<UpdateCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCartComponent]
    });
    fixture = TestBed.createComponent(UpdateCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
