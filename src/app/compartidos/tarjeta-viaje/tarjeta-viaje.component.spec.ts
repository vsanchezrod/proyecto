import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaViajeComponent } from './tarjeta-viaje.component';

describe('TarjetaViajeComponent', () => {
  let component: TarjetaViajeComponent;
  let fixture: ComponentFixture<TarjetaViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
