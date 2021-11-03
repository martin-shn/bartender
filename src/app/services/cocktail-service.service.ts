import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail';
import { tap, map } from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailServiceService {
  cocktails: Cocktail[];
  shoppingList:object[]=[];
  filter:string='';

  private _cocktails$ = new BehaviorSubject<Cocktail[]>([]);
  public cocktails$ = this._cocktails$.asObservable();

  constructor(private http: HttpClient) {}

  
  public async loadCocktails() {
    const URL =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

    const cocktailDB = localStorage.getItem('cocktailDB');
    if (!cocktailDB) {
      const res = await this.http.get<any>(URL).toPromise()
      const cocktails = res.drinks.map((drink: any) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          imgUrl: drink.strDrinkThumb,
          isStar: false,
        }));
        localStorage.setItem('cocktailDB', JSON.stringify(cocktails));
        this.cocktails = cocktails;
        // this._cocktails$.next(this.cocktails);
    } else {
      this.cocktails = JSON.parse(cocktailDB);
    }

    this._loadShoppingList();
    this._cocktails$.next(this.cocktails);
  }

  getById(cocktailId: string): Cocktail {
    const cocktail:Cocktail = this.cocktails.find(
      (cocktail) => cocktail.id === cocktailId
    );
    return cocktail
  }

  update(cocktail:Cocktail){
    if (cocktail.id) {
      const idx = this.cocktails.findIndex(currCocktail=>cocktail.id===currCocktail.id)
      cocktail.isStar = this.cocktails[idx].isStar
      this.cocktails.splice(idx,1,cocktail)
    } else {
      cocktail.id=this.makeId()
      cocktail.isStar = false
      this.cocktails.unshift(cocktail)
    }
    localStorage.setItem('cocktailDB', JSON.stringify(this.cocktails));
    this._cocktails$.next(this.cocktails)
  }

  saveShoppingList(shoppingList:any){
    const idx = this.shoppingList.findIndex((list:any)=>list.id===shoppingList.id)
    if (idx<0) this.shoppingList.push(shoppingList)
    else this.shoppingList.splice(idx,1,shoppingList)
    localStorage.setItem('cocktailShoppingListDB', JSON.stringify(this.shoppingList));
  }

  updateShoppingList(shoppingList:[]){
    this.shoppingList = shoppingList
    localStorage.setItem('cocktailShoppingListDB', JSON.stringify(this.shoppingList));
  }

  _loadShoppingList(){
    const shoppingListDb = localStorage.getItem('cocktailShoppingListDB');
    if (shoppingListDb) {
      this.shoppingList = JSON.parse(shoppingListDb)
    }
  }

  setFilter(filter:string = this.filter){
    this.filter=filter
    const filteredCocktails = this.cocktails.filter(cocktail=>cocktail.name.toLowerCase().includes(filter.toLowerCase()))
    this._cocktails$.next(filteredCocktails)
  }

  makeId(length=5) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
}
