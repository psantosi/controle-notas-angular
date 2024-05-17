import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grade } from '../model/grade';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  
  private readonly API = 'http://3.133.152.88:8080/grade';
  private requestOptions = {
    headers: new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXR5IiwiZXhwIjoxNzE1OTkzODU3fQ.wdsWv6zyQAzZth9efW1pU3fgQ6ICfoqgV9FrMXXBeW5LfVwdg-H2bm6Q7Ve9XRbS')
    .set('Content-Type', 'application/json')
  }

  constructor(private httpClient: HttpClient) { }

  list(studentId: Number) {
    return this.httpClient.get<Grade[]>(`${this.API}/student/${studentId}`, this.requestOptions)
    .pipe(
      first()
    );
  }

  update(date: Grade, id: Number) {
    return this.httpClient.put<Grade>(`${this.API}/${id}`, date, this.requestOptions);
  }

}
