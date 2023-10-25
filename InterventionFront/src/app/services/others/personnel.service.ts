import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  rootURL = `${environment.api}personnel`;
  constructor(private httpClient: HttpClient) { }

  getAllPersonnel(): Observable<any> {
    return this.httpClient.get(`${this.rootURL}`)
  }
}
