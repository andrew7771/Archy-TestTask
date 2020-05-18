import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = 'http://localhost:51256/api/users';

  users$ = this.http.get<User[]>(this.host)
    .pipe(
      tap(data => console.log('Users: ', JSON.stringify(data))),
      catchError(this.handleError)
    )

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.host, user)
          .pipe(
            tap(data => console.log('createUser: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );    
  }    

  getUserById (id: Number): Observable<User> {
    if (id !== 0) {
      const url = `${this.host}/${id}`;
      return this.http.get<User>(url)
        .pipe(
          tap(data => console.log('getUser: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }
  }

    updateUser(user: User): Observable<User> {
      const url = `${this.host}/${user.id}`;
      return this.http.put<User>(url, user)
        .pipe(
          tap(() => console.log('updateUser: ' + user.id)),
          // Return the product on an update
          map(() => user),
          catchError(this.handleError)
        );
    }

  constructor(private http: HttpClient) { }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
