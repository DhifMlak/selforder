import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifierGroupComponent } from './add-modifier-group.component';

describe('AddModifierGroupComponent', () => {
  let component: AddModifierGroupComponent;
  let fixture: ComponentFixture<AddModifierGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModifierGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifierGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
