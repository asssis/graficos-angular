import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVendaMensalComponent } from './chart-venda-mensal.component';

describe('ChartVendaMensalComponent', () => {
  let component: ChartVendaMensalComponent;
  let fixture: ComponentFixture<ChartVendaMensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVendaMensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVendaMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
