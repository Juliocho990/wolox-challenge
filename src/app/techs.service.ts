import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tech } from './tech';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechsService {

  readonly API_URL_ROOT = 'https://private-8e8921-woloxfrontendinverview.apiary-mock.com';

  constructor(private http: HttpClient) { }

  getTechs() {
    return this.http.get<Tech[]>(this.API_URL_ROOT + '/techs')
      .pipe(
        tap(_ => console.log('fetched techs')),
        catchError(err => of([]))
      );
  }
}
