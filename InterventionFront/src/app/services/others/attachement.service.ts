import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachementService {

  constructor(private http : HttpClient) { }

  download(filename : string) : Observable<HttpEvent<Blob>>{
    return this.http.get(`${environment.api}/file/download/${filename}`, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    })
  }
}
