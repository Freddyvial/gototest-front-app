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
    countrys;
    dataSource: MatTableDataSource<any>;
    ngOnInit(): void {
        console.log(this.user);
        this.consultUsers();
        this.consulCountrys();
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

    consulCountrys() {
        this.countryService.consultCountry().subscribe(resp => {
            this.countrys=resp;
        }, error => {
            console.log(error);
        });
    }
}