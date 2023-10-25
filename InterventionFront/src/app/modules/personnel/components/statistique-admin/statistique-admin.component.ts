import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique-admin',
  templateUrl: './statistique-admin.component.html',
  styleUrls: ['./statistique-admin.component.scss']
})
export class StatistiqueAdminComponent implements OnInit {

  composantVisible = true;
  basicData: any;

  
  basicOptions: any;

  data: any;

  options: any;

  constructor() { }
  hidden() {
    console.log("click");

    this.composantVisible = !this.composantVisible
  }


  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
      labels:  ['bulletin', 'wifi', 'carte etudiant', 'email institutionnel', 'certificat de scolarité'],
      datasets: [
        {
          data: [30, 39, 12, 20, 50, 5, 60, 32, 80, 64],
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
      labels: "Intervention",
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
