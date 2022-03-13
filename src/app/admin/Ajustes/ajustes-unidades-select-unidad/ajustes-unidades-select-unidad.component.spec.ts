import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesUnidadesSelectUnidadComponent } from './ajustes-unidades-select-unidad.component';

describe('AjustesUnidadesSelectUnidadComponent', () => {
  let component: AjustesUnidadesSelectUnidadComponent;
  let fixture: ComponentFixture<AjustesUnidadesSelectUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesUnidadesSelectUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesUnidadesSelectUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
