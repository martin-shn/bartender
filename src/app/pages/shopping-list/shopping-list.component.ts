import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ings:string[]=[]
  cocktails:any
  shoppingList:any

  constructor(private cocktailService:CocktailServiceService, private userMsgService:UserMsgService) { }

  ngOnInit(): void {
    this.shoppingList = this.cocktailService.shoppingList
  }

  onCheckBox(ev:MouseEvent, listId:string, listIdx:number, ingIdx:number){
    ev.stopPropagation()
    
    this.shoppingList[listIdx].ings[ingIdx].isChecked=!this.shoppingList[listIdx].ings[ingIdx].isChecked
    this.cocktailService.updateShoppingList(this.shoppingList)
  }

  updateList(){
    this.shoppingList.forEach((list:any, idx:number)=>{
      const newIngs:[] = list.ings.filter((ing:{ing:string, isChecked:boolean})=>!ing.isChecked)
      list.ings = newIngs
    })
    
    this.shoppingList = this.shoppingList.filter((list:any)=>list.ings.length>0)

    this.cocktailService.updateShoppingList(this.shoppingList)

    this.userMsgService.setUserMsg('Shopping list updated successfully')
  }
}
