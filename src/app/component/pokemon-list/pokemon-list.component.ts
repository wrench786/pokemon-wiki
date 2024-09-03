import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  currentPageNo: number = 0;
  pokemonDetails:any[] = [];

  constructor(
    private pokemonApiService: PokemonApiService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService
  ){}
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (queryParamMap:any) => {
      if(queryParamMap.has('pokemon')){
        this.loadSinglePokemonDetails(queryParamMap.get('pokemon'));
      }
      else{
        this.setCurrentPageNo(queryParamMap);
        this.loadAllPokemonDetails();
      }
    });
  }

  loadAllPokemonDetails():void{
    this.pokemonApiService.getPokemonDetails(this.currentPageNo).subscribe({
      next: (successResponse: any) => {
        this.pokemonDetails = successResponse;
      },
      error: (errorResponse: any) => {
        console.error(errorResponse);
      }
    });
  }

  loadSinglePokemonDetails(name:string){
    this.pokemonApiService.fetchIndividualPokemonDetailsByName(name).subscribe({
      next: (successResponse:any) => {
        this.pokemonDetails.splice(0, this.pokemonDetails.length,successResponse);
      },
      error: (errorResponse: any) => {
        console.error(errorResponse);
      }
    });
  }

  setCurrentPageNo(queryParamMap: any): void {
      this.currentPageNo = queryParamMap.has("page")? queryParamMap.get("page") : 0;
  }

  loadPreviousPage():void{
    this.router.navigate(['pokemon-list'], {
      queryParams: {page: --this.currentPageNo},
    });
  }

  loadNextPage():void{
    this.router.navigate(['pokemon-list'], {
      queryParams: {
        page: ++this.currentPageNo
      },
    });
  }

  viewDetails(pokemon:any): void{
    this.sharedDataService.sendData(pokemon);
    this.router.navigate(['pokemon-details']);
  }
}
