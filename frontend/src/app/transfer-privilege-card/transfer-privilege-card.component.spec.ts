import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPrivilegeCardComponent } from './transfer-privilege-card.component';

describe('TransferPrivilegeCardComponent', () => {
  let component: TransferPrivilegeCardComponent;
  let fixture: ComponentFixture<TransferPrivilegeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferPrivilegeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferPrivilegeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
