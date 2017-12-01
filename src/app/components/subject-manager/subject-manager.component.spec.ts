import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectManagerComponent } from './subject-manager.component';

describe('SubjectManagerComponent', () => {
  let component: SubjectManagerComponent;
  let fixture: ComponentFixture<SubjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
