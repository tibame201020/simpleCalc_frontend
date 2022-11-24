import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontIndexComponent } from './front-index/front-index.component';

const routes: Routes = [
  {path:'index', component:FrontIndexComponent},
  { path: '', redirectTo: "/index", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
