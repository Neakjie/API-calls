import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from './api-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

people$;
peopeleOb$;
  res;

  constructor(private router:Router,private route:ActivatedRoute,private service:ApiServiceService){
    this.people$ = this.service.getdata();
    console.log(this.service.getD());
    
   
//     this.people$.pipe(map((response:any)=>this.res = response.json()));
//     //console.log(this.peopeleOb$);
//     console.log(this.res);
    
    
// for(let p in this.people$){
//   //console.log(p);
// }
  
    
  }

submit(credentials){
  //console.log(credentials);
  
  this.service.login(credentials).subscribe(res=>{
    if(res){
      let resUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([resUrl||'/'])
    }
  })
}







}
