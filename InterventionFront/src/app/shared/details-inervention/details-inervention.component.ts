import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-inervention',
  templateUrl: './details-inervention.component.html',
  styleUrls: ['./details-inervention.component.scss']
})
export class DetailsInerventionComponent implements OnInit {

  details: any;
  yes: any

  @Input() intervention: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
