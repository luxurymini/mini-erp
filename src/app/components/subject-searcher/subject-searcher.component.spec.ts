import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSearcherComponent } from './subject-searcher.component';

describe('SubjectSearcherComponent', () => {
  let component: SubjectSearcherComponent;
  let fixture: ComponentFixture<SubjectSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
