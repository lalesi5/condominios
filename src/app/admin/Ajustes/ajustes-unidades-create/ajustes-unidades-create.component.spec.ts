import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesUnidadesCreateComponent } from './ajustes-unidades-create.component';

describe('AjustesUnidadesCreateComponent', () => {
  let component: AjustesUnidadesCreateComponent;
  let fixture: ComponentFixture<AjustesUnidadesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesUnidadesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesUnidadesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
