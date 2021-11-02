import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'cocktail-preview',
  templateUrl: './cocktail-preview.component.html',
  styleUrls: ['./cocktail-preview.component.scss']
})
export class CocktailPreviewComponent implements OnInit {

  @Input() cocktail:Cocktail
  
  constructor(private cocktailService:CocktailServiceService) { }

  ngOnInit(): void {
  }

  onStar(ev:MouseEvent, cocktailId:string){
    ev.stopPropagation()
    ev.preventDefault()
    const cocktailToUpdate:Cocktail = this.cocktailService.getById(cocktailId)
    cocktailToUpdate.isStar=!cocktailToUpdate.isStar
    this.cocktailService.update(cocktailToUpdate)
  }
}
