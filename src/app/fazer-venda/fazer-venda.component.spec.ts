import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerVendaComponent } from './fazer-venda.component';

describe('FazerVendaComponent', () => {
  let component: FazerVendaComponent;
  let fixture: ComponentFixture<FazerVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazerVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
