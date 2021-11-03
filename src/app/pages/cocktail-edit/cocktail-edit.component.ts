import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

const regex:RegExp = new RegExp(/(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i)

@Component({
  selector: 'cocktail-edit',
  templateUrl: './cocktail-edit.component.html',
  styleUrls: ['./cocktail-edit.component.scss'],
})
export class CocktailEditComponent implements OnInit, OnDestroy {
  cocktail: any={};
  subscription: Subscription;
  isAddRowActive:boolean=true;
  addIng:boolean=false;
  form: FormGroup;
  ingsList: FormArray=this.fb.array([]);
  isError:boolean=false;

  constructor(
    private cocktailService: CocktailServiceService, private route: ActivatedRoute, private http: HttpClient, private userMsgService: UserMsgService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params.id;
      if (cocktailId === 'new') {
        console.log('new');
        this.cocktail.strDrinkThumb='https://assets.bonappetit.com/photos/57acbec753e63daf11a4d99f/1:1/w_2560%2Cc_limit/siesta.jpg';
        this.form = this.fb.group({
          imgUrl: [this.cocktail.strDrinkThumb,[Validators.required, Validators.pattern(regex)]],
          cocktailName: [this.cocktail.strDrink||'',[Validators.required, Validators.minLength(3)]],
          glass: [this.cocktail.strGlass||'',[Validators.required, Validators.minLength(3)]],
          ingsList: this.getIngArray(),
          ins: [this.cocktail.strInstructions || '',[Validators.required,Validators.minLength(5)]]
        })
        this.isAddRowActive=false
        
      } else {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
        const res = await this.http.get<any>(URL).toPromise();
        this.cocktail = res.drinks[0];
        for (let i = 1; i < 16; i++) {
          if (res.drinks[0][`strIngredient${i}`])
          this.ingsList.push(this.getIngGroup(res.drinks[0][`strIngredient${i}`], res.drinks[0][`strMeasure${i}`]));
        }

        this.form = this.fb.group({
          imgUrl: [this.cocktail.strDrinkThumb,[Validators.required, Validators.pattern(regex)]],
          cocktailName: this.cocktail.strDrink||'',
          glass: this.cocktail.strGlass||'',
          ingsList: this.ingsList,
          ins: this.cocktail.strInstructions || ''
        })
      }
    });
  }

  dirtyInput(ev:any,target:string){
    this.isError=false
    const data = ev.target.value;
    
    if (target==='ing') this.addIng=(data.trim()==='')?false:true
    this.isAddRowActive=(this.addIng)
  }

  addIngRow(){
    if (this.ingsList.length<15) this.ingsList.push(this.getIngGroup())
    this.isAddRowActive=false
    this.addIng=false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getIngArray() {
    this.ingsList = this.fb.array([this.getIngGroup()])
    return this.ingsList
  }

  getIngGroup(ing='',measure='') {
    return this.fb.group({
      ing,
      measure
    })
  }

  save(){
    if (this.form.value.ingsList[this.form.value.ingsList.length-1].ing.trim()==='') this.form.value.ingsList.pop()
    console.log(this.form.value);
    console.log(this.cocktail);
    
    const cocktailToUpdate:any = {
      id:this.cocktail.idDrink||'',
      name: this.form.value.cocktailName,
      imgUrl: this.form.value.imgUrl,
      ins:this.form.value.ins,
      ings: this.form.value.ingsList,
      glass: this.form.value.glass
    }

    if (this.form.valid) this.isError=true
    this.cocktailService.update(cocktailToUpdate)
  }

  get imgUrl() { return this.form.get('imgUrl')}
  get name() { return this.form.get('cocktailName')}
  get glass() { return this.form.get('glass')}
  get ing() { return this.form.get('ingsList')}
  get ins() { return this.form.get('ins')}
}
