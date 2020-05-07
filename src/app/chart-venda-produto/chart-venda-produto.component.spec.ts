import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVendaProdutoComponent } from './chart-venda-produto.component';

describe('ChartVendaProdutoComponent', () => {
  let component: ChartVendaProdutoComponent;
  let fixture: ComponentFixture<ChartVendaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVendaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVendaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
