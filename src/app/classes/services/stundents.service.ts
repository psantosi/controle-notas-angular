import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StundentsService {

  private readonly API = 'http://3.133.152.88:8080/student';
  private requestOptions = {
    headers: new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXR5IiwiZXhwIjoxNzE1OTkzODU3fQ.wdsWv6zyQAzZth9efW1pU3fgQ6ICfoqgV9FrMXXBeW5LfVwdg-H2bm6Q7Ve9XRbS')
    .set('Content-Type', 'application/json')
  };

  constructor(private httpClient: HttpClient) { }

  list(classroomId: Number) {
    return this.httpClient.get<Student[]>(`${this.API}/classroom/${classroomId}`, this.requestOptions)
    .pipe(
      first()
    );
  }

  get(id: Number) {
    return this.httpClient.get<Student>(`${this.API}/${id}`, this.requestOptions)
  }

  salve(data: Student, classroomId: string) {
    data.classroomId = Number(classroomId);
    return this.httpClient.post<Student>(this.API, data, this.requestOptions);
  }

  update(data: Student, studentId: string) {
    return this.httpClient.put<Student>(`${this.API}/${studentId}`, data, this.requestOptions);
  }

  delete(id: Number) {
    return this.httpClient.delete<Student>(`${this.API}/${id}`, this.requestOptions);
  }
}
