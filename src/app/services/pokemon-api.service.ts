import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  //https://pokeapi.co/api/v2/pokemon?offset=0&limit=20
  private baseUrl: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private httpCliend: HttpClient ) {}

  getPokemonDetails(pageNo: number) : any{
    const url = `${this.baseUrl}?offset=${pageNo*20}&limit=20`;

    return this.fetchPokemonDetails(url).pipe(
      switchMap( (response) =>
        forkJoin(
          response.results.map(
            (pokemon:any) => 
              this.fetchIndividualPokemonDetailsByName(pokemon.name)
          )
        )
      )
    );
  }

  fetchPokemonDetails(url:string):Observable<any>{
    return this.httpCliend.get<any>(url);
  }

  fetchIndividualPokemonDetailsByName(name:string):Observable<any>{
    const url = `${this.baseUrl}/${name}`;
    return this.fetchPokemonDetails(url);
  }
}
