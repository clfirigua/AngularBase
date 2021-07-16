import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino:string = ''
  heroes : Heroe[] = [];
  heroeSelecionado:Heroe| undefined;
  constructor(private heroService:HeroesService) { }

  ngOnInit( ): void {
  }
  buscando(){
    this.heroService.getHeroeSujerencias(this.termino.trim()).subscribe(heroes => this.heroes = heroes)
  }
  opcionSelecionada(evento:MatAutocompleteSelectedEvent){
    if(!evento.option.value){this.heroeSelecionado=undefined
       return}
    const heroe : Heroe = evento.option.value;
     this.termino = heroe.superhero;
     this.heroService.getHeroePorID(heroe.id!).subscribe(data => this.heroeSelecionado=data);
  }

}
