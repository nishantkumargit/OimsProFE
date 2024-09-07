import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMCUComponent } from './node-mcu.component';

describe('NodeMCUComponent', () => {
  let component: NodeMCUComponent;
  let fixture: ComponentFixture<NodeMCUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeMCUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NodeMCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
