import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';

@Component({
  selector: 'cocktails-list',
  templateUrl: './cocktails-list.component.html',
  styleUrls: ['./cocktails-list.component.scss']
})
export class CocktailsListComponent implements OnInit {

  @Input() cocktails:Cocktail[]

  constructor() { }

  ngOnInit(): void {
  }

}
