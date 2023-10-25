import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DepartementService } from 'src/app/services/others/departement.service';
import { InterventionsService } from 'src/app/services/others/interventions.service';
import { PersonnelService } from 'src/app/services/others/personnel.service';
import { SousCategorieService } from 'src/app/services/others/sous-categorie.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';
import { FileHandle } from 'src/app/shared/interfaces/file-handle';
import { Intervention } from 'src/app/shared/interfaces/intervention-interface';

@Component({
  selector: 'app-intervention-etudiant',
  templateUrl: './intervention-etudiant.component.html',
  styleUrls: ['./intervention-etudiant.component.scss']
})
export class InterventionEtudiantComponent implements OnInit {

  enumList: string[] = ['ATTENTE', 'TRAITEMENT', 'TRAITEE', 'ECHEC']
  selectedEnum !: string;
  isGettingAll = true;
  interventionDialog = false
  search = "";
  submitting = false;
  isUpdating = false
  intervention: any;
  // Interventions = new Intervention()
  newIntervention!: Intervention;
  interventionList: Intervention[] = []
  personnelList: any = []
  senddingRequest = false
  selectedFile: any;
  composantVisible = true;
  urlFile: any
  inToken: any = '1920i110';


  interventionForm = this.formBuilder.group({
    sous_categorie: new FormControl('', [Validators.required]),
    matricule_etudiant: new FormControl(this.inToken, [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    // login_utilisateur: new FormControl('', [Validators.required]),
    libelleIntervention: new FormControl('Aucune description', [Validators.required]),
    // pieceJointe: new FormControl(''),
  })

  sousCategorie: any[] = []
  depart: any[] = []

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private intervetionService: InterventionsService, private personnelService: PersonnelService, private sousCat: SousCategorieService, private departementService: DepartementService) { }

  hidden() {
    this.composantVisible = !this.composantVisible
  }

  fermer() {
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'info', summary: 'Annulation', detail: 'operation annulée', life: 3000 });
      this.interventionForm.value.libelleIntervention = ''
      this.interventionForm.value.matricule_etudiant = ''
      this.interventionForm.value.sous_categorie = ''
      // this.interventionForm.value.pieceJointe = ''
      this.interventionForm.reset;
      this.submitting = false
    }
    this.interventionDialog = false;
  }

  creerIntervention(): void {
    this.interventionDialog = true;
    this.isUpdating = false;
    this.intervention = this.newIntervention;
  }


  getAllIntervention(): void {
    this.intervetionService.getAllIntervention().toPromise().then(
      (interventions) => {
        this.interventionList = interventions;
        console.log(this.interventionList);

        this.isGettingAll = false;
        this.messageService.add({
          severity: 'success',
          summary: 'succès',
          detail: 'Les éléments sont tous biens chargés',
          life: 3000
        });
        console.log(interventions);

      },
      (res) => {
        this.interventionList = [];
        this.isGettingAll = false;
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
      }
    );
  }

  // getAllPersonnel() {
  //   this.personnelService.getAllPersonnel().toPromise().then(
  //     (personnels) => {
  //       this.personnelList = personnels;
  //       this.isGettingAll = false;
  //     }
  //   );
  // }
  getAllSousCat() {
    this.sousCat.getAllsousCategorie().toPromise().then(
      (souscate) => {
        this.sousCategorie = souscate;
        console.log(this.sousCategorie);

        this.isGettingAll = false;
      }
    );
  }
  // getAllDepart() {
  //   this.departementService.getAllDepartement().toPromise().then(
  //     (dep) => {
  //       this.depart = dep;
  //       this.isGettingAll = false;
  //       console.log(dep);

  //     }
  //   );
  // }

  saveIntervention(e: Event): void {
    console.log(this.interventionForm.value);
    this.submitting = true
    this.intervetionService.saveIntervention(this.interventionForm.value, this.interventionForm.value.sous_categorie, this.interventionForm.value.matricule_etudiant).toPromise().then((data) => {
      console.log(data);
      this.interventionList.push(data);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmer',
        detail: `Intervention ajoutée avec success !`,
        life: 3000
      });
      this.interventionForm.reset;
      this.senddingRequest = false
      this.interventionDialog = false
      this.submitting = false
      window.location.reload()
    },
      (res) => {
        this.senddingRequest = false;
        this.interventionDialog = false
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de l\'intervention', life: 3000 });
        window.location.reload()
      }
    )

  }

  dropIntervention(id: string, nom: string) {
    // this.confirmationService.confirm({
    //   message: "Etes vous sur de vouloir supprimer l'intervention  " + nom + '?',
    //   header: 'Confirm',
    //   icon: 'fi fi-br-exclamation-triangle',
    //   accept: () => {
    //     this.isGettingAll = true;
    //     this.interventionService.deleteIntervention(id).toPromise().then((data) => {
    //       this.isGettingAll = false;
    //       if (data == null) {
    //         // tslint:disable-next-line:max-line-length
    //         this.messageService.add({ severity: 'success', summary: 'success', detail: `itervention N° ${id} supprimée avec success`, life: 3000 });
    //         // tslint:disable-next-line:triple-equals
    //         this.interventionList = this.interventionList.filter(it => it.id_intervention != id);
    //       }
    //       else {
    //         this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression de l\'intervention', life: 3000 });
    //       }
    //     });
    //   },
    //   reject: () => {
    //     this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annulée', life: 3000 });
    //   }
    // });
  }
  detailIntervention(intervention: Intervention, e: Event) {
    e.stopPropagation();
    this.intervention = intervention;
    this.isUpdating = true;
    this.interventionDialog = true
  }

  exportExcel() {
    Helpers.exportExcel('interventions', this.interventionList)
  }

  onChange(e: any): void {
    // this.selectedFile = e.target.files[0].name;
    if (e.target.files) {
      const file = e.target.files[0]

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.urlFile = fileHandle
      console.log(this.urlFile);
    }

  }
  ngOnInit(): void {
    // this.getAllPersonnel()
    this.getAllIntervention()
    this.getAllSousCat()
    // this.getAllDepart()
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
}
