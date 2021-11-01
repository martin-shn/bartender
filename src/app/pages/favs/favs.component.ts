import { Component, OnInit } from '@angular/core';
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
    this.favs = this.cocktailService.cocktails.filter(cocktail=>cocktail.isStar).map(fav=>({id:fav.id, name:fav.name}))
    console.log(this.favs);
    
  }

}
