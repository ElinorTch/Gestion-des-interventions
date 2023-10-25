import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/others/etudiant.service';
import { InterventionsService } from 'src/app/services/others/interventions.service';
import { PersonnelService } from 'src/app/services/others/personnel.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  taillePersonnel: any
  tailleEtudiant: any
  tailleIntervention: any

  composantVisible = true;
  basicData: any;

  basicOptions: any;
  constructor( private etudiantService: EtudiantService, private interventionService: InterventionsService, private personnelService: PersonnelService){ }
  hidden() {
    this.composantVisible = !this.composantVisible
  }

  getTaillePersonnel(){
    this.personnelService.getAllPersonnel().subscribe((data:any)=>{
      this.taillePersonnel = data.length
    })
  }
  getTailleInterventions(){
    this.interventionService.getAllIntervention().subscribe((data:any)=>{
      this.tailleIntervention = data.length
    })
  }
  getTailleEtudiant(){
    this.etudiantService.getAllEtudiant().subscribe((data:any)=>{
      this.tailleEtudiant = data.length
    })
  }

  ngOnInit(): void {
    this.getTailleEtudiant()
    this.getTailleInterventions()
    this.getTaillePersonnel()

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.basicData = {
      labels: 'Interventions',
      datasets: [
        {
          label: 'Interventions',
          data: [30, 39, 12, 20, 50, 15, 25, 5, 40, 53],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(113, 102, 230, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgba(113, 102, 230)'],
          borderWidth: 2
        }
      ]
    };
  }
}
