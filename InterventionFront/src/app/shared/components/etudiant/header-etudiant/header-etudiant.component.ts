import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-header-etudiant',
  templateUrl: './header-etudiant.component.html',
  styleUrls: ['./header-etudiant.component.scss']
})
export class HeaderEtudiantComponent implements OnInit {

  decodedToken:any
  token:any
  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.decodedToken = this.decodeToken(this.token);
    console.log(this.decodedToken);
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }


}

