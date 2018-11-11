import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesListaComponent } from './actividades-lista.component';

describe('ActividadesListaComponent', () => {
  let component: ActividadesListaComponent;
  let fixture: ComponentFixture<ActividadesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
