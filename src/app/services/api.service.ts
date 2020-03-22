import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenStorage } from '../auth/token.storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private token: TokenStorage,
  ) {}

  // function to set the header in every request
  private setHeaders(header: Map<string, string>): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = this.token.getToken();
    if (!!token) {
      // tslint:disable-next-line: no-string-literal
      headersConfig['Authorization'] = token;
    }

    if (header) {
      header.forEach((value, key) => {
        headersConfig[key] = value;
      });
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(
    path: string,
    options?: HttpParams,
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .get(`/api/${path}`, {
        headers: this.setHeaders(header),
        params: options,
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  put(
    path: string,
    body: object = {},
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .put(`/api/${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  post(
    path: string,
    body: object = {},
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .post(`/api/${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  delete(path: string, header?: Map<string, string>): Observable<any> {
    return this.http
      .delete(`/api/${path}`, {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }
}
