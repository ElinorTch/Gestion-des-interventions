import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DepartementService } from 'src/app/services/others/departement.service';
import { InterventionsService } from 'src/app/services/others/interventions.service';
import { PersonnelService } from 'src/app/services/others/personnel.service';
import { SousCategorieService } from 'src/app/services/others/sous-categorie.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';
import { FileHandle } from 'src/app/shared/interfaces/file-handle';
import { Intervention } from 'src/app/shared/interfaces/intervention-interface';
import jwt_decode from 'jwt-decode'
import { CategoriesService } from 'src/app/services/others/categories.service';
import { AttachementService } from 'src/app/services/others/attachement.service';

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
  categorieList: any = []
  senddingRequest = false
  selectedFile: any;
  composantVisible = false;
  urlFile: any
  inToken: any;
  codeToken: any;
  decodedToken: any;
  // inToken: any = '1920L034';
  token: any
  selectedIntervention: any
  vueDetals = false;
  interventionForm: FormGroup
  files: File[] = [];
  selectSousCat: any

  selectedId: any = 0;
  loading = true

  sousCategorie: any[] = []
  depart: any[] = []

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private intervetionService: InterventionsService, private personnelService: PersonnelService, private sousCat: SousCategorieService, private departementService: DepartementService, private categorieService: CategoriesService, private cdRef: ChangeDetectorRef) {
    this.token = localStorage.getItem('auth_token');
    this.decodedToken = this.decodeToken(this.token);
    this.inToken = this.decodedToken.matricule
    this.codeToken = this.decodedToken.id

    this.interventionForm = this.formBuilder.group({
      sous_categorie: new FormControl('', [Validators.required]),
      // departement: new FormControl('', [Validators.required]),
      matricule_etudiant: new FormControl(this.inToken, [Validators.required]),
      // status: new FormControl('', [Validators.required]),
      // login_utilisateur: new FormControl('', [Validators.required]),
      libelleIntervention: new FormControl('Aucune description', [Validators.required]),
      file: new FormControl(),
    })


  }

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
    this.vueDetals = false
    this.interventionDialog = true;
    this.isUpdating = false;
    this.intervention = this.newIntervention;
  }

  detailsIntervention(intervention: any): void {
    this.vueDetals = true
    this.selectedIntervention = intervention;
    this.interventionDialog = true

  }


  getAllIntervention(): void {
    this.intervetionService.getInterventionByEtudiant(this.inToken).toPromise().then(
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
    this.loading = false
    console.log("id selectionné : ", this.selectedId);

    // this.sousCat.getAllsousCategorie().toPromise().then(
    //   (souscate) => {
    //     this.sousCategorie = souscate;
    //     console.log(this.sousCategorie);

    //     this.isGettingAll = false;
    //   }
    // );
    this.sousCat.getSousCatById(this.selectedId).subscribe(
      (souscate) => {
        this.sousCategorie = souscate;
        console.log(this.sousCategorie);

        this.isGettingAll = false;
      }
    );
  }
  getAllDepart() {
    this.departementService.getAllDepartement().toPromise().then(
      (dep) => {
        this.depart = dep;
        this.isGettingAll = false;
        console.log(dep);

      }
    );
  }

  saveIntervention(): void {
    console.log("formulaire : ", this.interventionForm.value.sous_categorie);
    console.log("matricule etudiant", this.inToken);

    this.submitting = true
    this.intervetionService.saveIntervention(this.interventionForm.value, this.interventionForm.value.sous_categorie, this.inToken).subscribe((data) => {
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
      // window.location.reload()
    },
      (res) => {
        this.senddingRequest = false;
        this.interventionDialog = false
        this.messageService.add({ severity: 'info', summary: 'En Cours', detail: 'En cours de creation de l\'intervention', life: 3000 });
        // window.location.reload()
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

  getAllCategorie() {
    this.categorieService.getAllCategorie().subscribe(
      (data) => {
        this.categorieList = data
        console.log("Les categories : ", this.categorieList);

      })
  }
  onFirstDrop($event: any) {
    console.log("voici le bon : ", $event);

  }
  ngOnInit(): void {
    // this.getAllPersonnel()
    this.getAllIntervention()
    this.getAllDepart()
    this.getAllCategorie()

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


  saveInterventionFormData() {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file, file.name);
    }
    formData.append('sous_categorie', this.interventionForm.get("sous_categorie")?.value);
    formData.append('matricule_etudiant', this.interventionForm.get("matricule_etudiant")?.value);
    formData.append('libelleIntervention', this.interventionForm.get("libelleIntervention")?.value);
    console.log("voici le formDate : ", formData);
    console.log("identifiant de la categorie : ", this.interventionForm.value.sous_categorie);

    console.log("FormData : ", formData);


    this.intervetionService.saveIntervention(formData, this.interventionForm.value.sous_categorie, this.inToken).subscribe((data) => {
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
        this.messageService.add({ severity: 'info', summary: 'En Cours', detail: 'En cours de creation de l\'intervention', life: 3000 });
        window.location.reload()
      }
    )
    // console.log("la sous categorie : " , formData.get('sous_categorie'))
  }

  onFileSelect(event: any): void {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      this.files = event.target.files;
      this.interventionForm.get('file')?.setValue(this.files);
    }
  }

}
