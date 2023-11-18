import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AxiosService } from '../axios/axios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  rootUrl = `${environment.api}categorie`

  constructor(private httpClient: HttpClient, private axios: AxiosService) { }

  token: string | any = this.axios.getAuthToken()

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  getAllCategorie(): Observable<any> {
    return this.httpClient.get(`${this.rootUrl}`)
  }
}
