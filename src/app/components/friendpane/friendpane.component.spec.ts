import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendpaneComponent } from './friendpane.component';

describe('FriendpaneComponent', () => {
  let component: FriendpaneComponent;
  let fixture: ComponentFixture<FriendpaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendpaneComponent],
    });
    fixture = TestBed.createComponent(FriendpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
