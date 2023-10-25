import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  rootURL = `${environment.api}sousCategorie`;
  constructor(private httpClient : HttpClient) { }

  getAllsousCategorie(): Observable<any>{
    return this.httpClient.get(`${this.rootURL}`)
  }
}
