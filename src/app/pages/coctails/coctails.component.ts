import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';
import { HttpClient } from '@angular/common/http';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'coctails',
  templateUrl: './coctails.component.html',
  styleUrls: ['./coctails.component.scss']
})
export class CoctailsComponent implements OnInit {

  cocktails:Cocktail[]

  constructor(private cocktailService:CocktailServiceService) { }

  ngOnInit(): void {
    // const URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    
    // const cocktailDB = localStorage.getItem('cocktailDB')
    // if (!cocktailDB){
    // this.http.get<any>(URL).subscribe(
    //   res=>{
    //     const cocktails = res.drinks.map((drink:any)=>({id:drink.idDrink, name:drink.strDrink, imgUrl:drink.strDrinkThumb, isStar:false}))
    //     localStorage.setItem('cocktailDB', JSON.stringify(cocktails))
    //     this.cocktails = cocktails
    //   }
    // )}
    // else{
    //   this.cocktails = JSON.parse(cocktailDB)
    // }
    this.cocktailService.setFilter()
    this.cocktailService.cocktails$.subscribe(cocktails=>this.cocktails=cocktails)
  }

}
