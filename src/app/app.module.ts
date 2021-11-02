import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { CoctailsComponent } from './pages/coctails/coctails.component';
import { CocktailsListComponent } from './cmps/cocktails-list/cocktails-list.component';
import { CocktailPreviewComponent } from './cmps/cocktail-preview/cocktail-preview.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { IngredientPreviewComponent } from './cmps/ingredient-preview/ingredient-preview.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { FavsComponent } from './pages/favs/favs.component';
import { FilterComponent } from './cmps/filter/filter.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', redirectTo:'cocktails', pathMatch:'full' },
  // { path: 'home', redirectTo:'cocktails' },
  { path: 'cocktails', component: CoctailsComponent },
  { path: 'cocktails/:id', component: CocktailDetailsComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'favs', component: FavsComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoctailsComponent,
    CocktailsListComponent,
    CocktailPreviewComponent,
    CocktailDetailsComponent,
    IngredientPreviewComponent,
    ShoppingListComponent,
    FavsComponent,
    FilterComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
