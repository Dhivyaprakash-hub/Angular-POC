import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './user/auth.service';
@Component({
  selector: 'pm-root',
  styleUrls: ['./app.component.css'],
  templateUrl:'app.component.html'
})
export class AppComponent {
  showHead: boolean=false;
  ngOnInit(){

  }
  constructor(public auth:AuthService, private router:Router){

    router.events.forEach((event)=>{
      if(event instanceof NavigationStart){
        if(event['url']='/login'){
          this.showHead=false;
        }else{
          this.showHead=true;
        }
      }
    });


    function MyController($scope: { isHomepage: boolean; }) {
      $scope.isHomepage = true; // show navbar on homepage
    }
  }
  
}

