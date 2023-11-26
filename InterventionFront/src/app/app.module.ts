import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantComponent } from './modules/etudiant/etudiant.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { DashboardAdminComponent } from './modules/personnel/components/dashboard-admin/dashboard-admin.component';
import { InterventionAdminComponent } from './modules/personnel/components/intervention-admin/intervention-admin.component';
import { StatistiqueAdminComponent } from './modules/personnel/components/statistique-admin/statistique-admin.component';
import { EtudiantAdminComponent } from './modules/personnel/components/etudiant-admin/etudiant-admin.component';
import { DashboardEtudiantComponent } from './modules/etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { InterventionEtudiantComponent } from './modules/etudiant/intervention-etudiant/intervention-etudiant.component';
import { LoginEtudiantComponent } from './modules/authentication/login-etudiant/login-etudiant.component';
import { LoginPersonnelComponent } from './modules/authentication/login-personnel/login-personnel.component';
import { HeaderAdminComponent } from './shared/components/admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './shared/components/admin/sidebar-admin/sidebar-admin.component';
import { HeaderEtudiantComponent } from './shared/components/etudiant/header-etudiant/header-etudiant.component';
import { SdebarEtudiantComponent } from './shared/components/etudiant/sdebar-etudiant/sdebar-etudiant.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './shared/home-header/home-header.component';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from './shared/home-nav/home-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from "primeng/badge";
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PersonnelComponent } from './modules/personnel/personnel.component';
import { PersonnelsAdminComponent } from './modules/personnel/components/personnels-admin/personnels-admin.component';
import { ChartModule } from 'primeng/chart';

import { DetailsInerventionComponent } from './shared/details-inervention/details-inervention.component';
import { DepartementComponent } from './modules/personnel/components/departement/departement.component';
import { TerminerComponent } from './shared/terminer/terminer.component';



@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    PersonnelComponent,
    PersonnelsAdminComponent,
    DepartementComponent,
    AuthenticationComponent,
    DashboardAdminComponent,
    InterventionAdminComponent,
    StatistiqueAdminComponent,
    EtudiantAdminComponent,
    DashboardEtudiantComponent,
    InterventionEtudiantComponent,
    LoginEtudiantComponent,
    LoginPersonnelComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    HeaderEtudiantComponent,
    SdebarEtudiantComponent,
    MessagesComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeNavComponent,
    DetailsInerventionComponent,
    TerminerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ButtonModule,
    BadgeModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    SharedModule,
    ChartModule,
  ],
  providers: [MessageService, ConfirmationService,
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    }, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
