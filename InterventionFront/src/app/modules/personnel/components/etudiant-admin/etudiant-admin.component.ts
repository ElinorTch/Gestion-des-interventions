import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EtudiantService } from 'src/app/services/others/etudiant.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';
import { Etudiant } from 'src/app/shared/interfaces/etudiant-interface';

@Component({
  selector: 'app-etudiant-admin',
  templateUrl: './etudiant-admin.component.html',
  styleUrls: ['./etudiant-admin.component.scss']
})
export class EtudiantAdminComponent implements OnInit {
  composantVisible = true;

  etudiantList: Etudiant[] = [];
  isGettingAll = true
  fileDialog = false;
  search = ""
  hidden() {
    this.composantVisible = !this.composantVisible
  }
  constructor(private messageService: MessageService, private etudiantService: EtudiantService) { }

  exportExcel(): void {
    Helpers.exportExcel('etudiants', this.etudiantList)
  }

  ngOnInit(): void {
    this.getAllEtudiant()
  }

  getAllEtudiant() {
    this.etudiantService.getAllEtudiant().subscribe((data: any) => {
      this.isGettingAll = false
      this.messageService.add({
        severity: 'success',
        summary: 'succès',
        detail: 'Les éléments sont tous biens chargés',
        life: 3000
      });
      this.etudiantList = data
      console.log(data);

    },
      (res: any) => {
        this.etudiantList = [];
        this.isGettingAll = false;
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
        console.log(res);
      })
  }


}
