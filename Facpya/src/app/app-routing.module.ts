import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacpyaPrincipalComponent } from './facpya-principal/facpya-principal.component';

const routes: Routes = [ {
  path: 'principal',
  component: FacpyaPrincipalComponent,
},
{
  path: '',
  component: FacpyaPrincipalComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
