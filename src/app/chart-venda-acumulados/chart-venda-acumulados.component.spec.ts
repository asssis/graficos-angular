import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVendaAcumuladosComponent } from './chart-venda-acumulados.component';

describe('ChartVendaAcumuladosComponent', () => {
  let component: ChartVendaAcumuladosComponent;
  let fixture: ComponentFixture<ChartVendaAcumuladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVendaAcumuladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVendaAcumuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
