import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserservicesService {
private httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
  constructor(private http: HttpClient) { }
private apiurl = environment.base_url;

  loginUser(user: any): Observable<any> {
return this.http.post(this.apiurl + 'user/login', user, this.httpOptions);
  }
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiurl + 'user/registration', user, this.httpOptions);
  }
  forgotPasswordUser(user: any): Observable<any> {
    return this.http.post(this.apiurl + 'user/forgotpassword', user);
  }
  resetpassword(user: any , token: any): Observable<any> {
    return this.http.post(this.apiurl + 'user/update/' + token, user);
  }
}
