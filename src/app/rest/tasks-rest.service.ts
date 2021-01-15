import {Task} from '../models/task';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksRestService {

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Task[]> {
    return this.http.get<Task[]>('api/tasks');
  }

  delete$(taskId: string): Observable<Task> {
    return this.http.delete<Task>(`api/tasks/${taskId}`);
  }

  create$(task: Task): Observable<Task> {
    return this.http.post<Task>(`api/tasks/`, task);
  }

  update$(task: Task): Observable<Task> {
    return this.http.put<Task>(`api/tasks/${task.id}`, task);
  }
}
