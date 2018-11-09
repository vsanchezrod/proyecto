import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelacionActividadesComponent } from './modal-cancelacion-actividades.component';

describe('ModalCancelacionActividadesComponent', () => {
  let component: ModalCancelacionActividadesComponent;
  let fixture: ComponentFixture<ModalCancelacionActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelacionActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCancelacionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
