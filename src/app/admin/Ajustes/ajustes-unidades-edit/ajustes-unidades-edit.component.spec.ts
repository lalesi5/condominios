import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesUnidadesEditComponent } from './ajustes-unidades-edit.component';

describe('AjustesUnidadesEditComponent', () => {
  let component: AjustesUnidadesEditComponent;
  let fixture: ComponentFixture<AjustesUnidadesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesUnidadesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesUnidadesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
