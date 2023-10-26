import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelComponent } from './personnel.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { StatistiqueAdminComponent } from './components/statistique-admin/statistique-admin.component';
import { InterventionAdminComponent } from './components/intervention-admin/intervention-admin.component';
import { EtudiantAdminComponent } from './components/etudiant-admin/etudiant-admin.component';
import { PersonnelsAdminComponent } from './components/personnels-admin/personnels-admin.component';
import { DepartementComponent } from './components/departement/departement.component';

const routes: Routes = [
  {
    path: '',
    component: PersonnelComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardAdminComponent
  },
  {
    path: 'statistiques',
    component: StatistiqueAdminComponent
  },
  {
    path: 'interventions',
    component: InterventionAdminComponent
  },
  {
    path: 'etudiants',
    component: EtudiantAdminComponent
  },
  {
    path: 'personnels',
    component: PersonnelsAdminComponent
  },
  {
    path: 'departement',
    component: DepartementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
