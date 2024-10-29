import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl
  private _httpClient = inject(HttpClient)
  constructor() { }

  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.apiUrl}/todos`);
  }

  deleteTask(taskID: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/todos/${taskID}`);
  }

  updateTask(task: Task): Observable<Task> {
    console.log("id de la tache", task.id);
    return this._httpClient.put<Task>(`${this.apiUrl}/todos/${task.id}`, task);
  }

}
