import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioImageComponent } from './bio-image.component';

describe('BioImageComponent', () => {
  let component: BioImageComponent;
  let fixture: ComponentFixture<BioImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
