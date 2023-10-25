import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-inervention',
  templateUrl: './details-inervention.component.html',
  styleUrls: ['./details-inervention.component.scss']
})
export class DetailsInerventionComponent implements OnInit {

  details: any;
  yes: any
  constructor() { }

  ngOnInit(): void {
    this.yes = localStorage.getItem('details')
    this.details = JSON.parse(this.yes)
    console.log(this.details);

  }

}
