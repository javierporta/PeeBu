import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoClassifierComponent } from './auto-classifier.component';

describe('AutoClassifierComponent', () => {
  let component: AutoClassifierComponent;
  let fixture: ComponentFixture<AutoClassifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoClassifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
