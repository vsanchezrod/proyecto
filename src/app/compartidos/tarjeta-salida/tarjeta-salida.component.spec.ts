import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaSalidaComponent } from './tarjeta-salida.component';

describe('TarjetaSalidaComponent', () => {
  let component: TarjetaSalidaComponent;
  let fixture: ComponentFixture<TarjetaSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
