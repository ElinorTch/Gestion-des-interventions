import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  decodedToken: any
  token: any
  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.decodedToken = this.decodeToken(this.token);
    console.log(this.decodedToken);
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}
