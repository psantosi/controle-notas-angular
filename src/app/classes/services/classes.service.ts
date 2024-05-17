import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Class } from '../model/class';
import {first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly API = 'http://3.133.152.88:8080/classroom';
  private requestOptions = {
    headers: new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXR5IiwiZXhwIjoxNzE1OTkzODU3fQ.wdsWv6zyQAzZth9efW1pU3fgQ6ICfoqgV9FrMXXBeW5LfVwdg-H2bm6Q7Ve9XRbS')
    .set('Content-Type', 'application/json')
  }

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Class[]>(`${this.API}`, this.requestOptions)
    .pipe(
      first()
    );
  }

  save(data: Class) {
    return this.httpClient.post<Class>(this.API, data, this.requestOptions);
  }
}
