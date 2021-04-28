import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';
import { HomeComponent } from '../home/home.component';
import { CountryService } from '../services/CountryService';
@Component({
    selector: 'app-userdata',
    templateUrl: './userdata.component.html',
    styleUrls: ['./userdata.component.css']
})
export class UserDataComponent implements OnInit {

    constructor(private countryService: CountryService, private authService: AuthService, private homeComponent: HomeComponent, private spinner: NgxSpinnerService, private loginService: AuthService, private router: Router) { }
    user = this.homeComponent.user;
    displayedColumns: string[] = ['Username', 'Country', 'Description', 'edit'];
    users: any;
    edit = false;
    isAdmin=false;
    isObser=false;
    isFinal=false;
    countrys;
    dataSource: MatTableDataSource<any>;
    ngOnInit(): void {
        if (this.user.role.name == "Administrador") {
            this.consultUsers();
            this.consulCountrys();
            this.isAdmin=true;
        } else {
            if (this.user.role.name == "Observador") {
                this.consultUsers();
                this.isObser=true;
            }else{this.isFinal=true;
                this.consulCountrys();}
        }
    }

    editUser(element) {
        this.edit = true
    }
    consultUsers() {
        this.spinner.show();
        this.authService.consultUsers().subscribe(resp => {
            console.log(resp);
            this.users = resp
            this.dataSource = new MatTableDataSource<any>(this.users);
            this.spinner.hide();
        }, error => {
            console.log(error);
            this.spinner.hide();
        });
    }
    countrySelect(element){
        this.user.country=element;
    }
    consulCountrys() {
        this.countryService.consultCountry().subscribe(resp => {
            this.countrys = resp;
        }, error => {
            console.log(error);
        });
    }
    isFormInvalid(){
        if(!this.user.country.name || !this.user.description){return true};
    }
    save(){
        this.spinner.show()
        this.authService.upDateDescription(this.user).subscribe(resp=>{
            this.edit=false;
            this.spinner.hide();                     
        },error=>{
            console.log(error);
            this.spinner.hide();
            this.edit=false;
        });
    }
}