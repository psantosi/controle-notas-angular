import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = 'http://3.133.152.88:8080/task';
  private requestOptions = {
    headers: new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXR5IiwiZXhwIjoxNzE1OTkzODU3fQ.wdsWv6zyQAzZth9efW1pU3fgQ6ICfoqgV9FrMXXBeW5LfVwdg-H2bm6Q7Ve9XRbS')
    .set('Content-Type', 'application/json')
  };

  constructor(private httpClient: HttpClient) { }

  list(classroomId: string) {
    return this.httpClient.get<Task[]>(`${this.API}/classroom/${classroomId}`, this.requestOptions)
    .pipe(
      first()
    );
  }

  save(data: Task, classroomId: string) {
    data.classroomId = Number(classroomId);
    return this.httpClient.post<Task>(this.API, data, this.requestOptions);
  }

  delete(id: Number) {
    return this.httpClient.delete<Task>(`${this.API}/${id}`, this.requestOptions);
  }

}
