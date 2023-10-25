import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtudiantAuthService } from 'src/app/services/auth/etudiant-auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-etudiant',
  templateUrl: './login-etudiant.component.html',
  styleUrls: ['./login-etudiant.component.scss']
})
export class LoginEtudiantComponent implements OnInit {


  submitting = false;
  loginForm = this.formBuilder.group({
    matricule: new FormControl('', [Validators.required]),
    codeAuthentification: new FormControl('', [Validators.required])
  });
  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService, private authService: EtudiantAuthService) { }


  login(): void {
    this.submitting = true;
    //appel de la requete du service
    this.authService.login({
      matricule: this.loginForm.value.matricule,
      codeAuthentification: this.loginForm.value.codeAuthentification
    }).toPromise().then((data: any) => {
      this.submitting = false;
      this.messageService.add({
        icon: 'fi fi-br-check-circle',
        severity: 'success',
        summary: 'Vous êtes connecté',
        detail: 'Bienvenue',
        life: 3000
      });
      console.log(data);

      this.router.navigate(['etudiant/dashboard'])
    },
      (res) => {
        this.submitting = false;
        this.messageService.add({
          icon: 'fi fi-br-cross-circle',
          severity: 'error',
          summary: ' Erreur',
          detail: 'Vérifier votre login ou mot de passe',
          life: 3000
        });
        console.log(res);

        this.loginForm.value.matricule = "";
        this.loginForm.value.codeAuthentification = "";
      });
  }

  formPersonnel() {
    this.router.navigate(['auth/personnelLogin'])
  }



  ngOnInit(): void {

  }

}
