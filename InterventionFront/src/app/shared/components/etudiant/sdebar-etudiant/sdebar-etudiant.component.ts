import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EtudiantAuthService } from 'src/app/services/auth/etudiant-auth.service';

@Component({
  selector: 'app-sdebar-etudiant',
  templateUrl: './sdebar-etudiant.component.html',
  styleUrls: ['./sdebar-etudiant.component.scss']
})
export class SdebarEtudiantComponent implements OnInit {

  constructor(private messageService: MessageService, private authService: EtudiantAuthService, private route : Router) { }

  logOut() {
    localStorage.removeItem('auth_token')
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: `Vous êtes déconnecté !`,
      life: 3000
    })
    this.route.navigate(['auth/etudiantLogin'])
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
