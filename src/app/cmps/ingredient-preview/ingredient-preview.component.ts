import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'ingredient-preview',
  templateUrl: './ingredient-preview.component.html',
  styleUrls: ['./ingredient-preview.component.scss']
})

export class IngredientPreviewComponent implements OnInit {

  @Input() ing:{ing:string, measure:string}
  @Output() checkBoxClicked: EventEmitter<any> = new EventEmitter()
  constructor(private userMsgService:UserMsgService) { }

  ngOnInit(): void {
  }

  onIngClick(ev:MouseEvent, url:string){
    ev.stopPropagation()
    ev.preventDefault()
    this.userMsgService.setIngImg(url)
  }
}
