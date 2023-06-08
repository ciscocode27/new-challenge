import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListadoComponent } from './listado/listado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormularioComponent } from './formulario/formulario.component';



@NgModule({
  declarations: [
    HomeComponent, 
    NavbarComponent, 
    ListadoComponent, FormularioComponent],
  imports: [
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ]
})
export class HomeModule { }
