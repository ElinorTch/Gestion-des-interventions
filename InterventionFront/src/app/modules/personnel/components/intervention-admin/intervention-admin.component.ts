import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InterventionsService } from 'src/app/services/others/interventions.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';
import { Intervention } from 'src/app/shared/interfaces/intervention-interface';
import jwt_decode from 'jwt-decode'
import { AttachementService } from 'src/app/services/others/attachement.service';

@Component({
  selector: 'app-intervention-admin',
  templateUrl: './intervention-admin.component.html',
  styleUrls: ['./intervention-admin.component.scss']
})
export class InterventionAdminComponent implements OnInit {
  enumList: string[] = ['ATTENTE', 'TRAITEMENT', 'TRAITEE', 'ECHEC']
  selectedEnum !: string;
  isGettingAll = true;
  interventionList: any[] = [];
  personnelList: any[] = [];
  isUpdating = false;
  search = '';
  submitting = false;
  senddingRequest = false;
  interventionDialog = false;
  selectedFile: any;
  details: any[] = []
  composantVisible = false;
  inToken: any = '';
  token:any
  // inToken: any = '202320';
  selectedIntervention: any
  selectedInterventionForm: any
  vueTerminer = false;
  vueDetals = false;


  interventionForm = this.formBuilder.group({
    id_intervention: new FormControl(''),
    nom_intervention: new FormControl('', [Validators.required]),
    matricule_etudiant: new FormControl('', [Validators.required]),
    login_utilisateur: new FormControl('', [Validators.required]),
    description: new FormControl('Rien à ajouter', [Validators.required]),
    status: new FormControl('Rien à ajouter', [Validators.required]),
  })
  hidden() {
    this.composantVisible = !this.composantVisible
  }

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private interventionService: InterventionsService, private attachementService: AttachementService) {
    this.token = localStorage.getItem('auth_token');
    const decodedToken = this.decodeToken(this.token);
    this.inToken = decodedToken.id

    
    this.getAllIntervention()
   }

  exportExcel(): void {
    Helpers.exportExcel('Interventions', this.interventionList)
  }

  ngOnInit(): void {
    // this.recupererDetails()
  }

  detailsIntervention(intervention: any): void {
    this.vueDetals = true
    this.selectedIntervention = intervention;
    this.interventionDialog = true

  }


  onChange(e: any): void {
    this.selectedFile = e.target.files[0].name;
  }


  setFormData(intervention: any) {
    this.interventionForm.setValue({
      id_intervention: intervention.id_intervention,
      nom_intervention: intervention.nom_intervention,
      matricule_etudiant: intervention.matricule_etudiant,
      login_utilisateur: intervention.login_utilisateur,
      description: intervention.description,
      status: intervention.status,
    });
    // this.interventionForm.updateValueAndValidity()

  }

  saveIntervention(e: Event): void {
    // this.interventionService.createIntervention(this.interventionForm.value).toPromise().then((data) => {
    //   this.interventionList.join(data);
    //   this.messageService.add({
    //     severity: 'info',
    //     summary: 'Confirmer',
    //     detail: `Intervention mise à jour avec success !`,
    //     life: 3000
    //   });
    //   this.interventionForm.reset;
    //   this.senddingRequest = false
    //   this.interventionDialog = false
    // },
    //   (res) => {
    //     this.senddingRequest = false;
    //     // tslint:disable-next-line:max-line-length
    //     this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de l\'intervention', life: 3000 });
    //   }
    // )
    // this.interventionForm = this.formBuilder.group({
    //   nom_intervention: new FormControl('', [Validators.required]),
    //   matricule_etudiant: new FormControl('', [Validators.required]),
    //   login_utilisateur: new FormControl('', [Validators.required]),
    //   description: new FormControl('Rien à ajouter', [Validators.required]),
    //   pieceJointe: new FormControl(''),
    // })

  }

  demandeTraitee(itemIntervention: any) {
    this.submitting = true;
    this.interventionService.prendreEnCharge(itemIntervention, this.enumList[2], itemIntervention.idDemande, this.inToken).toPromise().then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'TRAITEE',
        detail: `Intervention bien traitée !`,
        life: 3000
      });
      this.submitting = false
      // window.location.reload()

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    },
      () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors du traitement de la requete', life: 3000 });
        // window.location.reload()

        setTimeout(() => {
          window.location.reload();
        }, 1500);

      }
    )
  }
  demandeTraitement(itemIntervention: any) {
    this.submitting = true;
    this.interventionService.prendreEnCharge(itemIntervention, this.enumList[1], itemIntervention.idDemande, this.inToken).toPromise().then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'En Traitement',
        detail: `Intervention en cours de traitement !`,
        life: 3000
      });
      this.submitting = false;
      // window.location.reload()

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    },
      () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors du traitement de la requete', life: 3000 });
        // window.location.reload()

        setTimeout(() => {
          window.location.reload();
        }, 1500);

      }
    )
  }
  demandeEchec(itemIntervention: any) {
    this.submitting = true;
    this.interventionService.prendreEnCharge(itemIntervention, this.enumList[3], itemIntervention.idDemande, this.inToken).toPromise().then(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'ECHEC',
        detail: `Intervention est passée en mode ECHEC !`,
        life: 8000
      });
      this.submitting = false
      // window.location.reload()

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    },
      () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors du traitement de la requete', life: 3000 });
        // window.location.reload()

        setTimeout(() => {
          window.location.reload();
        }, 1500);

      }
    )
  }

  getAllIntervention() {
    this.interventionService.getInterventionByPersonnel(this.inToken).subscribe((data: any) => {
      this.isGettingAll = false
      this.messageService.add({
        severity: 'success',
        summary: 'succès',
        detail: 'Les éléments sont tous biens chargés',
        life: 3000
      });
      this.interventionList = data
      console.log(data);

    },
      (res: any) => {
        this.interventionList = [];
        this.isGettingAll = false;
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
        console.log(res);

      }
    )
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  truncateDescription(description: string | null, length: number = 30): string {
    if (!description) {
      return ''
    }
    if (description.length > length) {
      return description.substring(0, length) + '...';
    }
    return description;
  }

  downloadFile(event: any) {
    for (const fichier of event) {
      this.attachementService.download(fichier.fileName).subscribe((blob: any) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fichier.fileName;
        link.click();
      });
    }
  }
  terminerIntervention(intervention: any): void {   
    this.vueTerminer = true
    this.selectedInterventionForm = intervention;
    this.interventionDialog = true
  }
}
