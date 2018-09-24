import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioUsuarioComponent } from './calendarioUsuario.component';

describe('CalendarioUsuarioComponent', () => {
  let component: CalendarioUsuarioComponent;
  let fixture: ComponentFixture<CalendarioUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
