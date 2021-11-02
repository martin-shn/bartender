import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent implements OnInit {
  subscription: Subscription;
  cocktail: any = {};
  ings:any=[];
  shoppingList:any=[];

  constructor(private cocktailService: CocktailServiceService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private userMsgService:UserMsgService) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params.id;
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
      const res = await this.http.get<any>(URL).toPromise();
      this.cocktail = res.drinks[0];
      for (let i = 1; i < 16; i++) {
        if(res.drinks[0][`strIngredient${i}`]) this.ings.push({
          ing: res.drinks[0][`strIngredient${i}`],
          measure: res.drinks[0][`strMeasure${i}`],
        });
      }
    });
  }

  onCheckBoxClick(ing:string){
    const idx = this.shoppingList.findIndex((item:any)=>item.ing===ing)
    if (idx>=0) {
      this.shoppingList.splice(idx,1)
    } else {
      this.shoppingList.push({ing, isChecked:false})
    }
  }

  onAddToShopping(){
    this.cocktailService.saveShoppingList({id:this.cocktail.idDrink, name:this.cocktail.strDrink, ings:this.shoppingList})
    this.userMsgService.setUserMsg('Added to your shopping list successfully')
  }
}
