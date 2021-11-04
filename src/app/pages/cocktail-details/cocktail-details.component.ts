import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent implements OnInit {
  subscription: Subscription;
  cocktail: Cocktail;
  ings: any = [];
  shoppingList: any = [];

  constructor(
    private cocktailService: CocktailServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userMsgService: UserMsgService,
    private dbService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params.id;
      this.cocktail = this.dbService.getById(cocktailId)[0];
      if (!this.cocktail?.ins) {

        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
        const res = await this.http.get<any>(URL).toPromise();

        for (let i = 1; i < 16; i++) {
          if (res.drinks[0][`strIngredient${i}`])
            this.ings.push({
              ing: res.drinks[0][`strIngredient${i}`],
              measure: res.drinks[0][`strMeasure${i}`],
            });
        }

        this.cocktail = {...this.cocktail,
          id: res.drinks[0].idDrink,
          name: res.drinks[0].strDrink,
          imgUrl: res.drinks[0].strDrinkThumb,
          ins: res.drinks[0].strInstructions,
          ingsList: this.ings,
          glass: res.drinks[0].strGlass,
        };

        this.cocktailService.update(this.cocktail)
      }
    });
  }

  onCheckBoxClick(ing: { measure: string; ing: string }) {
    const idx = this.shoppingList.findIndex(
      (item: any) =>
        item.ing.ing === ing.ing && item.ing.measure === ing.measure
    );
    if (idx >= 0) {
      this.shoppingList.splice(idx, 1);
    } else {
      this.shoppingList.push({ ing, isChecked: false });
    }
  }

  onAddToShopping(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();

    if (this.shoppingList.length) {
      this.cocktailService.saveShoppingList({
        id: this.cocktail.id,
        name: this.cocktail.name,
        imgUrl: this.cocktail.imgUrl,
        ings: this.shoppingList,
      });
      this.userMsgService.setUserMsg(
        'Added to your shopping list successfully'
      );
    } else {
      this.userMsgService.setUserMsg('Nothing to add...');
    }
  }
}
