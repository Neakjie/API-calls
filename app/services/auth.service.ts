import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  token = localStorage.getItem("token");

  constructor(private http: Http, private router: Router) {
  }

  login(credentials) {
    return this.http.post("/api/authenticate",
      JSON.stringify(credentials)).map(response => {
        let result = response.json();
        if (result && result.token) {
          localStorage.setItem("token", result.token);
          this.token = result.token;
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  isLoggedIn() {
    // return tokenNotExpired();
    let jwtHelper = new JwtHelper();

    if (!this.token)
      return false;
    let expirationDate = jwtHelper.getTokenExpirationDate(this.token);
    let isExpired = jwtHelper.isTokenExpired(this.token);
    console.log("expirationDate:" + expirationDate);
    console.log("isExpired: " + isExpired);
    return !isExpired;
  }

  get currentUser() {
    if (!this.token) return null;

    let jwtHelper = new JwtHelper().decodeToken(this.token);
    console.log("get currentUser: " + JSON.stringify(jwtHelper));
    return jwtHelper;
  }
}

