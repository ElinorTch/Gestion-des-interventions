import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { LoginPersonnelComponent } from './login-personnel/login-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    pathMatch: 'full',
  },
  {
    path: 'etudiantLogin',
    component: LoginEtudiantComponent
  },
  {
    path: 'personnelLogin',
    component: LoginPersonnelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
