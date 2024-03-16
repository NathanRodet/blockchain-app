import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivilegeCardComponent } from './edit-privilege-card.component';

describe('EditPrivilegeCardComponent', () => {
  let component: EditPrivilegeCardComponent;
  let fixture: ComponentFixture<EditPrivilegeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrivilegeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPrivilegeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
