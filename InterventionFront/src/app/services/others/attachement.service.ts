import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AxiosService } from '../axios/axios.service';

@Injectable({
  providedIn: 'root'
})
export class AttachementService {

  constructor(private http: HttpClient, private axios: AxiosService) { }
  token: string | any = this.axios.getAuthToken()

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  // Observable<HttpEvent<Blob>>
  download(filename: string): Observable<Blob> {
    const options: any = {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events',
      Headers: this.headers
    }
    return this.http.get(`${environment.file}file/download/${filename}`, { responseType: 'blob'})
  }

  // downloadFile(fileName: string): Observable<Blob> {
  //   const url = `${environment.api}/file/download/${fileName}`; // Remplacez par l'URL de votre API pour télécharger le fichier
  //   return this.http.get(url, { responseType: 'blob' });
  // }
}
