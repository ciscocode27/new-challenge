import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListadoComponent } from './listado/listado.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,children: [
          {
            path:'listado',component: ListadoComponent
          },
          {
            path:'form', component: FormularioComponent
          },
          {
            path:'', redirectTo:'listado', pathMatch:'full'
          },
          {
            path:'**', redirectTo:'listado',pathMatch:'full'
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
