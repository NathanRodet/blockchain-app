import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnedPrivilegeCardComponent } from './view-owned-privilege-card.component';

describe('ViewOwnedPrivilegeCardComponent', () => {
  let component: ViewOwnedPrivilegeCardComponent;
  let fixture: ComponentFixture<ViewOwnedPrivilegeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOwnedPrivilegeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOwnedPrivilegeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
