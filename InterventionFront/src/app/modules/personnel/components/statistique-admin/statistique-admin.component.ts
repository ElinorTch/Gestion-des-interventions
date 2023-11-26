import { Component, OnInit } from '@angular/core';
import { InterventionsService } from 'src/app/services/others/interventions.service';

@Component({
  selector: 'app-statistique-admin',
  templateUrl: './statistique-admin.component.html',
  styleUrls: ['./statistique-admin.component.scss']
})
export class StatistiqueAdminComponent implements OnInit {

  composantVisible = false;
  basicData: any;
  tabNomIntervention: any[] = []
  tabOccurenceIntervention: any[] = []

  basicOptions: any;

  data: any;
  final: any[] = []
  options: any;

  constructor(private interventionService: InterventionsService) { }
  hidden() {
    console.log("click");

    this.composantVisible = !this.composantVisible
  }


  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');





    this.interventionService.getAllIntervention().subscribe((data) => {
      this.tabNomIntervention = data
      // console.log(data);

      for (const yes of data) {
        this.final.push(yes.sousCategorie.libelle)
      }

      const sousCat = this.filtreByLibelle(this.tabNomIntervention)
      const occurrences = this.countOccurrences(this.final);
      const uniqueValues = this.getUniqueValues(occurrences);

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.data = {
        labels: sousCat,
        datasets: [
          {
            data: uniqueValues,
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--violet-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--pink-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };


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
        labels: sousCat,
        datasets: [
          {
            label: 'Interventions',
            data: occurrences,
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(113, 102, 230, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgba(113, 102, 230)'],
            borderWidth: 2
          }
        ]
      };
    })

  }


  filtreByLibelle(interventions: any[]): any[] {
    const uniqueRegion = new Set<string>();
    const filtreInterventions: any[] = [];

    for (const inter of interventions) {
      if (!uniqueRegion.has(inter.sousCategorie.libelle)) {
        uniqueRegion.add(inter.sousCategorie.libelle);
        filtreInterventions.push(inter.sousCategorie.libelle);
      }
    }

    return filtreInterventions;
  }


  //occurences
  countOccurrences(obj: any): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    function countValues(obj: any) {
      if (obj && typeof obj === 'object') {
        Object.values(obj).forEach((value) => {
          countValues(value);
        });
      } else {
        if (counts[obj]) {
          counts[obj]++;
        } else {
          counts[obj] = 1;
        }
      }
    }

    countValues(obj);

    return counts;
  }


  getUniqueValues(obj: any): any[] {
    const values: any[] = [];

    function extractValues(obj: any) {
      if (obj && typeof obj === 'object') {
        Object.values(obj).forEach((value) => {
          extractValues(value);
        });
      } else {
        if (!values.includes(obj)) {
          values.push(obj);
        }
      }
    }

    extractValues(obj);

    return values;
  }
}
