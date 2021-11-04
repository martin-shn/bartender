import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail';

const DB = 'cocktailDB';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getById(cocktailId:string):[Cocktail] {
    const data = localStorage.getItem(DB)
    if (!data) return null
    return JSON.parse(data).filter((cocktail:Cocktail)=>cocktail.id===cocktailId)
  }
}
