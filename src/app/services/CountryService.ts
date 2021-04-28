import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountryService{

    private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultCountry() {
    return this.httpClient.get(`${this.REST_API_SERVER}/country`);
  }
}