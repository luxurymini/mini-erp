import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayListComponent } from './today-list.component';

describe('TodayListComponent', () => {
  let component: TodayListComponent;
  let fixture: ComponentFixture<TodayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
