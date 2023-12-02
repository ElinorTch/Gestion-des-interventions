import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode'
import { MessageService } from 'primeng/api';
import { AttachementService } from 'src/app/services/others/attachement.service';
import { InterventionsService } from 'src/app/services/others/interventions.service';
import { PersonnelService } from 'src/app/services/others/personnel.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

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
  token: any
  codeDepartement: any = ''
  listeDepartement: any[] = []
  piecesJointes: any[] = []
  // inToken: any = '202320';
  selectedIntervention: any
  selectedInterventionForm: any

  vueDetals = false;
  vueTerminer = false;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private interventionService: InterventionsService, private personnelService: PersonnelService, private attachementService: AttachementService) {
    this.token = localStorage.getItem('auth_token');
    const decodedToken = this.decodeToken(this.token);
    this.inToken = decodedToken.id
    console.log("token" + decodedToken);

    this.personnelService.getAllPersonnelId(this.inToken).toPromise().then((data) => {
      this.codeDepartement = data.departements[0].codeDepartement
      console.log(data.departements);
      console.log(this.codeDepartement);

      for (const codes of data.departements) {
        this.listeDepartement.push(codes.codeDepartement)
        this.interventionService.getInterventionByDepartement(codes.codeDepartement).subscribe((data: any) => {
          console.log(this.codeDepartement);
          this.isGettingAll = false
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Les éléments sont tous biens chargés',
            life: 3000
          });
          this.interventionList = data
          // for(const inside of data.pieceJointe){
          //   this.piecesJointes.push(inside)
          // }
          // console.log("les pieces jointes sont :" , this.piecesJointes);

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
      console.log("liste des departements", this.listeDepartement);




    })
    // this.getAllIntervention()
  }


  ngOnInit(): void {

  }

  exportExcel(): void {
    Helpers.exportExcel('Interventions', this.interventionList)
  }


  hidden() {
    this.composantVisible = !this.composantVisible
  }

  detailsIntervention(intervention: any): void {
    this.vueDetals = true
    this.selectedIntervention = intervention;
    this.interventionDialog = true

  }
  terminerIntervention(intervention: any): void {
    console.log(intervention);

    this.vueTerminer = true
    this.selectedInterventionForm = intervention;
    this.interventionDialog = true
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
      console.log(event[0].fileName);
      this.attachementService.download(fichier.fileName).subscribe((blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fichier.fileName;
        link.click();
      });
    }
  }


}
