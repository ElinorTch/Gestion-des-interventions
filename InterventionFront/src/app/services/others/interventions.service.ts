import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

  rootURL = `${environment.api}intervention`;

  constructor(private httpClient: HttpClient) { }

  getAllIntervention(): Observable<any> {
    return this.httpClient.get(`${this.rootURL}`)
  }

  getInterventionByEtudiant(matricule: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/etudiant/${matricule}`)
  }

  getInterventionByDepartement(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/departement/${code}`)
  }

  getInterventionByPersonnel(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/personnel/${code}`)
  }

  getInterventionBystatus(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/status/${code}`)
  }

  saveIntervention(data: any, idSousCategorie: any, matricule: any): Observable<any> {
    return this.httpClient.post(`${this.rootURL}/save/${idSousCategorie}/${matricule}`, data)
  }

  prendreEnCharge(data: any, status: any, idDemande: any, codePersonnel: any) {
    return this.httpClient.put(`${this.rootURL}/update/${status}/${idDemande}/${codePersonnel}`, data)
  }
}
