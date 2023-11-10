import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode'
import { EtudiantService } from 'src/app/services/others/etudiant.service';

@Component({
  selector: 'app-header-etudiant',
  templateUrl: './header-etudiant.component.html',
  styleUrls: ['./header-etudiant.component.scss']
})
export class HeaderEtudiantComponent implements OnInit {

  decodedToken: any
  token: any
  matricule: any
  nom: any
  email: any
  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.decodedToken = this.decodeToken(this.token);
    console.log(this.decodedToken);
    this.matricule = this.decodedToken.matricule
    this.emailEtudiant()
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  emailEtudiant() {
    this.etudiantService.getEtudiantByMatricule(this.matricule).subscribe((data: any) => {
      this.nom = data.candidat.nom
      this.email = data.candidat.email
      
    })
  }


}

