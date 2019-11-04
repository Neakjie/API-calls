import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
token = localStorage.getItem("token");
  res: Object;


  constructor(private http:HttpClient,private router:Router) { }

  
  login(credential){
    return this.http.post("/api/authenticate",
    JSON.stringify(credential)).pipe(map((response:any)=>{
      let res = response.json();
      if(res && res.token){
        localStorage.setItem("token",res.token);
        return true;
      }
      return false;
    }))

  }


  getdata():Observable<object>{
    
    
    var jsonData = this.http.get('/assets/data.json');
    console.log(jsonData);
    
    return jsonData;
}

getD(){

  var test = this.http.get('/assets/data.json');
  
  return test.pipe(map(res=>{return this.res=res.hasOwnProperty}))
  

}
}