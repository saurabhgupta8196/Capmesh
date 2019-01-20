import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNetworksComponent } from './my-networks.component';

describe('MyNetworksComponent', () => {
  let component: MyNetworksComponent;
  let fixture: ComponentFixture<MyNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNetworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
