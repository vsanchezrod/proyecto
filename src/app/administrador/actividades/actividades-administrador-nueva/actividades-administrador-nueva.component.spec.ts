import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesAdministradorNuevaComponent } from './actividades-administrador-nueva.component';

describe('ActividadesAdministradorNuevaComponent', () => {
  let component: ActividadesAdministradorNuevaComponent;
  let fixture: ComponentFixture<ActividadesAdministradorNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesAdministradorNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesAdministradorNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
