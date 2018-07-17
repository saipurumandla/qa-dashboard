import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseModalComponent } from './testcase-modal.component';

describe('TestcaseModalComponent', () => {
  let component: TestcaseModalComponent;
  let fixture: ComponentFixture<TestcaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
