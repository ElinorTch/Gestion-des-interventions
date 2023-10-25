import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Etudiant } from 'src/app/shared/interfaces/etudiant-interface';
import { environment } from 'src/environments/environment.prod';
import { AxiosService } from '../axios/axios.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantAuthService {

  public currentUser: Observable<Etudiant>;
  private currentUserSubject: BehaviorSubject<Etudiant>

  rootURL = `${environment.api}`;

  constructor(private http: HttpClient, private axios : AxiosService) {
    let storageUser;
    const storageUserAstr = localStorage.getItem('currentEtudiant');
    if (storageUserAstr) {
      storageUser = JSON.parse(storageUserAstr)
    }
    this.currentUserSubject = new BehaviorSubject<Etudiant>(storageUser)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Etudiant {
    return this.currentUserSubject.value;
  }

  login(userData: any): Promise<any> {
    // return this.http.post<any>(`${this.rootURL}/login/Etudiant`, userData).pipe(
    //   map((response: Etudiant) => {
    //     if (response) {
    //       localStorage.setItem('currentEtudiant', JSON.stringify(response))
    //       this.currentUserSubject.next(response)
    //     }
    //     return response
    //   })
    // );
    return this.axios.request(
      "POST",
      "/login/Etudiant",
      {
        login : userData.matricule,
        password : userData.codeAuthentification
      }
    ).then(reponse => {
      this.axios.setAuthToken(reponse.data.token);
    })
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('currentEtudiant')
    this.currentUserSubject.next(new Etudiant)
    // return this.http.post<any>(`${this.rootURL}logOut.php`, data);
  }

}
