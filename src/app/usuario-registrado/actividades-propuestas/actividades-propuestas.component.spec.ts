import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesPropuestasComponent } from './actividades-propuestas.component';

describe('ActividadesPropuestasComponent', () => {
  let component: ActividadesPropuestasComponent;
  let fixture: ComponentFixture<ActividadesPropuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesPropuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
