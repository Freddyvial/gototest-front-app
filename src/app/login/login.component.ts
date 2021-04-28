import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HomeComponent } from '../home/home.component';
import { RoleService } from '../services/roleservice';
import { error } from 'protractor';
import { UserDataComponent } from '../userdata/userdata.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  roles;

  @Output() submit = new EventEmitter<string>();
  durationInSeconds = 3;
  constructor(private homeComponent: HomeComponent,private roleService: RoleService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private loginService: AuthService, private router: Router) { }
  
  user = new User();
  options: FormGroup;
  newUser = new User();
  ObjList;
  ngOnInit(): void {

    this.consultRole();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {

    return this.email.hasError('email') ? 'Email incorrecto' : '';
  }

  login() {
    this.spinner.show();

    this.loginService.login(this.user).subscribe(resp => {
      const user = JSON.parse(JSON.stringify(resp));
      console.log(user);
      if (resp != null) {
       this.homeComponent.nameUser(user);
        this.router.navigateByUrl('/userdata');
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.openSnackBar('Usuario o Contraseña invalidos', 'Verifica la información');
      }
    }, error => {
      console.error(error);
    })

  }
  consultRole() {
    this.spinner.show();
    this.roleService.consultRole().subscribe(resp => {
      console.log(resp);
      this.spinner.hide();
    }, error => {
      console.log('Error:: ', error);
      this.spinner.hide();
    });

  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }
}

