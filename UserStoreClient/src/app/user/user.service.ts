import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User as UserInfo } from './user';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = 'http://localhost:51256/api/users';


  users$ = this.http.get<UserInfo[]>(this.host)
    .pipe(
      tap(data => console.log('Users: ', JSON.stringify(data))),
      catchError(this.handleError)
    )

  addUser (user: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.host, user)
          .pipe(
            tap(data => console.log('createUser: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
  }    

    // updateUser(product: UserInfo): Observable<UserInfo> {
    //   const url = `${this.host}/${usr.userId}`;
    //   return this.http.put<UserInfo>(url, usr)
    //     .pipe(
    //       tap(() => console.log('updateProduct: ' + usr.userId)),
    //       // Return the product on an update
    //       map(() => product),
    //       catchError(this.handleError)
    //     );
    // }

  constructor(private http: HttpClient) { }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
