import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroesRoutesModule } from './heroes-routes.module';
import { MaterialModule } from '../material/material.module';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { ImagenesPipe } from './pipes/imagenes.pipe';
import { FormsModule } from '@angular/forms';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HeroeComponent,
    HomeComponent,
    ListadoComponent,
    TarjetasComponent,
    ImagenesPipe,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutesModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class HeroesModule { }
