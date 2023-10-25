import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './etudiant.component';
import { InterventionEtudiantComponent } from './intervention-etudiant/intervention-etudiant.component';
import { DashboardEtudiantComponent } from './dashboard-etudiant/dashboard-etudiant.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardEtudiantComponent
  },
  {
    path: 'interventions',
    component: InterventionEtudiantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
