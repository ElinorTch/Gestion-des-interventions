import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  rootURL = `${environment.api}department`;
  constructor(private httpClient : HttpClient) { }

  getAllDepartement(): Observable<any>{
    return this.httpClient.get(`${this.rootURL}`)
  }
}
