import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PersonnelService } from 'src/app/services/others/personnel.service';
import { Helpers } from 'src/app/shared/helpers/Helpers';
import { Personnel } from 'src/app/shared/interfaces/personnel-interface';

@Component({
  selector: 'app-personnels-admin',
  templateUrl: './personnels-admin.component.html',
  styleUrls: ['./personnels-admin.component.scss']
})
export class PersonnelsAdminComponent implements OnInit {

  composantVisible = false;

  personnelList: Personnel[] = [];
  isGettingAll = true
  fileDialog = false;
  search = ""
  hidden() {
    this.composantVisible = !this.composantVisible
  }
  constructor(private personnelService: PersonnelService, private msgService: MessageService) { }

  exportExcel(): void {
    Helpers.exportExcel('personnel', this.personnelList)
  }

  ngOnInit(): void {
    this.getAllPersonnel()
  }

  getAllPersonnel() {
    this.personnelService.getAllPersonnel().subscribe((data: any) => {
      this.isGettingAll = false
      this.msgService.add({
        severity: 'success',
        summary: 'succès',
        detail: 'Les éléments sont tous biens chargés',
        life: 3000
      });
      this.personnelList = data
      console.log(data);
      
    },
      (res: any) => {
        this.personnelList = [];
        this.isGettingAll = false;
        this.msgService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
        console.log(res);


      })
  }

}
