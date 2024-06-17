import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCancelCardComponent } from './consultation-cancel-card.component';

describe('ConsultationCancelCardComponent', () => {
  let component: ConsultationCancelCardComponent;
  let fixture: ComponentFixture<ConsultationCancelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationCancelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCancelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
