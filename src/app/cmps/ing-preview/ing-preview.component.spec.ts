import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngPreviewComponent } from './ing-preview.component';

describe('IngPreviewComponent', () => {
  let component: IngPreviewComponent;
  let fixture: ComponentFixture<IngPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
