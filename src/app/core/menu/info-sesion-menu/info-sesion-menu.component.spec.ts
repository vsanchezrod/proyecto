import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSesionMenuComponent } from './info-sesion-menu.component';

describe('InfoSesionMenuComponent', () => {
  let component: InfoSesionMenuComponent;
  let fixture: ComponentFixture<InfoSesionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSesionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSesionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
