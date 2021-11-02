import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent implements OnInit {

  favs:any
  constructor(private cocktailService:CocktailServiceService) { }

  ngOnInit(): void {
    this.cocktailService.cocktails$.subscribe(cocktails=>
      this.favs=cocktails.filter(cocktail=>cocktail.isStar).map(fav=>({id:fav.id, name:fav.name, imgUrl:fav.imgUrl}))
    )}

  onStar(ev:any, cocktailId:string){
    ev.stopPropagation()
    const cocktailToUpdate:Cocktail = this.cocktailService.getById(cocktailId)
    cocktailToUpdate.isStar=!cocktailToUpdate.isStar
    this.cocktailService.update(cocktailToUpdate)
  }

}
