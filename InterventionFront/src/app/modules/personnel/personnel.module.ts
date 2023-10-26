import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { DepartementComponent } from './components/departement/departement.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonnelRoutingModule
  ]
})
export class PersonnelModule { }
