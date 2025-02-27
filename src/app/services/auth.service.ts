import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }
  public login(userInfo: User){
  
   return this.httpClient.get(`${this.REST_API_SERVER}/consultUser?userName=`+userInfo.email+'&password='+userInfo.password);
  }
  public upDateDescription(body) {
    return this.httpClient.post(`${this.REST_API_SERVER}/upDateDescription`, body)
  }
  public consultUsers() {
    return this.httpClient.get(`${this.REST_API_SERVER}/consultUsers`);
  }
  


}
