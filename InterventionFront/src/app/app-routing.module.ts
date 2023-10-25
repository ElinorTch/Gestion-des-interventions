import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EtudiantComponent } from './modules/etudiant/etudiant.component';
import { PersonnelComponent } from './modules/personnel/personnel.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'etudiant',
    component: EtudiantComponent,
    loadChildren: ()=> import('./modules/etudiant/etudiant.module').then(m=> m.EtudiantModule)
  },
  {
    path: 'personnel',
    component: PersonnelComponent,
    loadChildren: () => import('./modules/personnel/personnel.module').then(m => m.PersonnelModule)
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: ()=> import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  // {
  //   path: 'auth',
  //   component: AuthenticationComponent,
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
