import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.jogmaApi + '/login/', { username: username, password: password });
  }

  test(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(environment.jogmaApi + '/login/test', httpOptions);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
