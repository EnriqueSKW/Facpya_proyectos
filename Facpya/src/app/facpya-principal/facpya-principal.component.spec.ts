import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacpyaPrincipalComponent } from './facpya-principal.component';

describe('FacpyaPrincipalComponent', () => {
  let component: FacpyaPrincipalComponent;
  let fixture: ComponentFixture<FacpyaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacpyaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacpyaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
