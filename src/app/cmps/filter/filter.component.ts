import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filter:string;
  constructor(private cocktailService:CocktailServiceService) { }

  ngOnInit(): void {
    this.filter = this.cocktailService.filter
  }

  onSetFilter(){
    this.cocktailService.setFilter(this.filter)
  }
}
