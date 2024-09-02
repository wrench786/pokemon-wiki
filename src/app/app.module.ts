import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBannerComponent } from './component/top-banner/top-banner.component';
import { FooterComponent } from './component/footer/footer.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { DetailsPageComponent } from './component/details-page/details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBannerComponent,
    FooterComponent,
    PokemonListComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
