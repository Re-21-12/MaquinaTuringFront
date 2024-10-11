import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionFormComponent } from './transition-form.component';

describe('TransitionFormComponent', () => {
  let component: TransitionFormComponent;
  let fixture: ComponentFixture<TransitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
