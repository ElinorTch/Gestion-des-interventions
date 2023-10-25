import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Personnel } from 'src/app/shared/interfaces/personnel-interface';
import { environment } from 'src/environments/environment';
import { AxiosService } from '../axios/axios.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnelAuthService {
  public currentUser: Observable<Personnel>;
  private currentUserSubject: BehaviorSubject<Personnel>

  rootURL = `${environment.api}utilisateur`;

  constructor(private http: HttpClient, private axios : AxiosService) {
    let storageUser;
    const storageUserAstr = localStorage.getItem('currentUser');
    if (storageUserAstr) {
      storageUser = JSON.parse(storageUserAstr)
    }
    this.currentUserSubject = new BehaviorSubject<Personnel>(storageUser)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Personnel {
    return this.currentUserSubject.value;
  }

  login(userData: any): Promise<any> {
    // return this.http.post<any>(`${this.rootURL}/login`, userData).pipe(
    //   map((response: Personnel) => {
    //     if (response) {
    //       localStorage.setItem('currentUser', JSON.stringify(response))
    //       this.currentUserSubject.next(response)
    //     }
    //     return response
    //   })
    // );
    return this.axios.request(
      "POST",
      "/login/Personnel",
      {
        login : userData.login,
        password : userData.mot_de_passe
      }
    ).then(reponse => {
      this.axios.setAuthToken(reponse.data.token);
    })
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(new Personnel)
    // return this.http.post<any>(`${this.rootURL}logOut.php`, data);
  }
}
