import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPreviewComponent } from './ingredient-preview.component';

describe('IngredientPreviewComponent', () => {
  let component: IngredientPreviewComponent;
  let fixture: ComponentFixture<IngredientPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
