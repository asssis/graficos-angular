import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVendasComponent } from './tabela-vendas.component';

describe('TabelaVendasComponent', () => {
  let component: TabelaVendasComponent;
  let fixture: ComponentFixture<TabelaVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
