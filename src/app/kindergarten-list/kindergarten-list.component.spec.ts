import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergartenListComponent } from './kindergarten-list.component';

describe('KindergartenListComponent', () => {
  let component: KindergartenListComponent;
  let fixture: ComponentFixture<KindergartenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergartenListComponent]
    });
    fixture = TestBed.createComponent(KindergartenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
