import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'cocktail-edit',
  templateUrl: './cocktail-edit.component.html',
  styleUrls: ['./cocktail-edit.component.scss'],
})
export class CocktailEditComponent implements OnInit, OnDestroy {
  cocktail: any={};
  subscription: Subscription;
  ings:any = [];
  isAddRowActive:boolean=true;

  constructor(
    private cocktailService: CocktailServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userMsgService: UserMsgService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params.id;
      if (cocktailId === 'new') {
        console.log('new');
        this.cocktail.strDrinkThumb='https://assets.bonappetit.com/photos/57acbec753e63daf11a4d99f/1:1/w_2560%2Cc_limit/siesta.jpg';
        
      } else {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
        const res = await this.http.get<any>(URL).toPromise();
        this.cocktail = res.drinks[0];
        for (let i = 1; i < 16; i++) {
          if (res.drinks[0][`strIngredient${i}`])
            this.ings.push({
              ing: res.drinks[0][`strIngredient${i}`],
              measure: res.drinks[0][`strMeasure${i}`],
            });
        }
      }
      console.log(this.ings);
      console.log(this.cocktail);
    });
  }

  addIngRow(){
    if (this.ings.length===15) this.isAddRowActive=false
    else this.ings.push({measure:'', ing:''})
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
