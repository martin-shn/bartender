import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'coctails',
  templateUrl: './coctails.component.html',
  styleUrls: ['./coctails.component.scss']
})
export class CoctailsComponent implements OnInit {

  // cocktails:Cocktail[]
  cocktails:Observable<Cocktail[]>

  constructor(private cocktailService:CocktailServiceService) { }

  async ngOnInit(): Promise<void> {
    const res:string = await this.cocktailService.setFilter().toPromise()
    
    this.cocktails = this.cocktailService.cocktails$
    // .subscribe(cocktails=>this.cocktails=cocktails)
  }

}
