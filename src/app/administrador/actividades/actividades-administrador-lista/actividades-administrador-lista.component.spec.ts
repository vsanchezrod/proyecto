import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesAdministradorListaComponent } from './actividades-administrador-lista.component';

describe('ActividadesAdministradorListaComponent', () => {
  let component: ActividadesAdministradorListaComponent;
  let fixture: ComponentFixture<ActividadesAdministradorListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesAdministradorListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesAdministradorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
