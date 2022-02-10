import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesUnidadesComponent } from './ajustes-unidades.component';

describe('AjustesUnidadesComponent', () => {
  let component: AjustesUnidadesComponent;
  let fixture: ComponentFixture<AjustesUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
