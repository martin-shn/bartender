import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ingredient-preview',
  templateUrl: './ingredient-preview.component.html',
  styleUrls: ['./ingredient-preview.component.scss']
})

export class IngredientPreviewComponent implements OnInit {

  @Input() ing:any
  @Output() checkBoxClicked: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
