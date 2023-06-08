import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const MAIN = '/main';

const routes: Routes = [
      { path: '', redirectTo: MAIN, pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () => import('./components/home/home.module').then(i => i.HomeModule),
      },
      { path: '**', redirectTo: MAIN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
