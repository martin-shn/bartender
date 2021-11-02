import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from './services/cocktail-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bartender';

  constructor(
    private cocktailService: CocktailServiceService
  ) {}

  ngOnInit(): void {
    this.cocktailService.loadCocktails();
  }
}
