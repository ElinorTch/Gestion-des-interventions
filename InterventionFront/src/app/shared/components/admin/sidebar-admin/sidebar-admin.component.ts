import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit{

  constructor(private route : Router, private messageService : MessageService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  logOut(){
    localStorage.removeItem('auth_token')
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: `Vous êtes déconnecté !`,
      life: 3000
    })
    this.route.navigate(['auth/personnelLogin'])
  }

}
