import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AxiosService } from '../axios/axios.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  rootURL = `${environment.api}etudiant`;

  constructor(private httpClient : HttpClient, private axios: AxiosService) { }

  token : string | any = this.axios.getAuthToken()

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  getAllEtudiant(): Observable<any>{
    return this.httpClient.get(`${this.rootURL}`, {headers : this.headers})
  }
}
