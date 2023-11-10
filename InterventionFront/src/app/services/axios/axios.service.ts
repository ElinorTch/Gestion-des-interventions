import { Injectable } from '@angular/core';
import axios from 'axios'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AxiosService {

  constructor() {
    axios.defaults.baseURL = environment.api
    axios.defaults.headers.post["Content-Type"] = "application/json"
  }

  request(method: string, url: string, data: any): Promise<any>{
    let headers = {};

    if(this.getAuthToken() !== null){
      headers = {"Authorization": "Bearer" + this.getAuthToken()}
    } else {
      console.log("Token vide")
    }
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  }

  getAuthToken() : string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken( token : string ): void {
    if(token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token")
    }
  }
}
