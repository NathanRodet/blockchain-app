import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeCardListComponent } from './list-privilege-card.component';

describe('PrivilegeCardListComponent', () => {
  let component: PrivilegeCardListComponent;
  let fixture: ComponentFixture<PrivilegeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
