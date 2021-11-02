import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'coctails',
  templateUrl: './coctails.component.html',
  styleUrls: ['./coctails.component.scss']
})
export class CoctailsComponent implements OnInit {

  cocktails:Cocktail[]

  constructor(private cocktailService:CocktailServiceService) { }

  ngOnInit(): void {
    this.cocktailService.setFilter()
    this.cocktailService.cocktails$.subscribe(cocktails=>this.cocktails=cocktails)
  }

}
