import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AxiosService } from '../axios/axios.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

  rootURL = `${environment.api}intervention`;

  constructor(private httpClient: HttpClient, private axios: AxiosService) { }

  token : string | any = this.axios.getAuthToken()

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });


  getAllIntervention(): Observable<any> {
    return this.httpClient.get(`${this.rootURL}`, {headers : this.headers})
  }

  getInterventionByEtudiant(matricule: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/etudiant/${matricule}`, {headers : this.headers})
  }

  getInterventionByDepartement(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/departement/${code}`, {headers : this.headers})
  }

  getInterventionByPersonnel(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/personnel/${code}`, {headers : this.headers})
  }

  getInterventionBystatus(code: any): Observable<any> {
    return this.httpClient.get<any>(`${this.rootURL}/status/${code}`, {headers : this.headers})
  }

  saveIntervention(data: any, idSousCategorie:any, matricule:any): Observable<any> {
    return this.httpClient.post(`${this.rootURL}/save/${idSousCategorie}/${matricule}`, {headers : this.headers}, data)
  }
}
