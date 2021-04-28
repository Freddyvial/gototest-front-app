import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role;
  title = 'Home';
  user;

  constructor(public dialog: MatDialog, private router: Router, private loginService: AuthService) { }

 
  nameUser(user){
    this.user=user;    
  }


  logout() {
    this.router.navigateByUrl('/login')
    this.user=null;
  }

}
