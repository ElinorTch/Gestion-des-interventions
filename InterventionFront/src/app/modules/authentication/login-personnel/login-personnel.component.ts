import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PersonnelAuthService } from 'src/app/services/auth/personnel-auth.service';

@Component({
  selector: 'app-login-personnel',
  templateUrl: './login-personnel.component.html',
  styleUrls: ['./login-personnel.component.scss']
})
export class LoginPersonnelComponent {

  submitting = false;
  formPersonnel = this.formBuilder.group({
    login: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService, private authPersonnelService: PersonnelAuthService) { }

  ngOnInit(): void {

  }

  loginPersonnel(): void {
    this.submitting = true;
    console.log(this.formPersonnel);
    this.authPersonnelService.login({
      login: this.formPersonnel.value.login,
      mot_de_passe: this.formPersonnel.value.mot_de_passe

    }).toPromise().then((data: any) => {
      this.submitting = false;
      this.messageService.add({
        icon: 'fi fi-br-check-circle',
        severity: 'success',
        summary: 'Vous êtes connecté',
        detail: 'Bienvenue',
        life: 2000
      });
      console.log(data);

      this.router.navigate(['personnel/dashboard'])
    },
      (res) => {
        this.submitting = false;
        this.messageService.add({
          icon: 'fi fi-br-cross-circle',
          severity: 'error',
          summary: 'Vérifier votre login ou mot de passe ',
          detail: 'Réessayez',
          life: 2000
        });
        console.log(res);

        this.formPersonnel.value.login = "";
        this.formPersonnel.value.mot_de_passe = "";
      }
    )
  }

  formetudiant() {
    this.router.navigate(['auth/etudiantLogin'])
  }
}
