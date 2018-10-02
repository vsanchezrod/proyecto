import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaOpinionComponent } from './tarjeta-opinion.component';

describe('TarjetaOpinionComponent', () => {
  let component: TarjetaOpinionComponent;
  let fixture: ComponentFixture<TarjetaOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
