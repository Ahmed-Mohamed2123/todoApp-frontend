import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {TaskRes} from "../../interface/task/taskRes";
import {TaskAll} from '../../interface/task/taskAll';
import { ApiEndpoints } from '../../commons/end-points';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(userId: string, data: FormData): Observable<TaskRes> {
    const query = `?userId=${userId}`;
    try {
      return this.http.post<TaskRes>(ApiEndpoints.taskEndpoints.addTask + query, data);
    } catch (e) {
      console.error(e);
    }
  }

  editTask(id: string, userId: string, data: FormData): Observable<TaskRes> {
    const url = `?id=${id}&userId=${userId}`;
    try {
      return this.http.put<TaskRes>(ApiEndpoints.taskEndpoints.editTask + url, data);
    } catch (e) {
      console.error(e);
    }
  }

  deleteTask(id: string, userId: string): Observable<any> {
    const url = `?id=${id}&userId=${userId}`;
    try {
      return this.http.delete<any>(ApiEndpoints.taskEndpoints.deleteTask + url);
    } catch (e) {
      console.error(e);
    }
  }

  getTaskById(id: number): Observable<TaskRes> {
    const url = `?id=${id}`;
    try {
      return this.http.get<TaskRes>(ApiEndpoints.taskEndpoints.getDataById + url);
    } catch (e) {
      console.error(e);
    }
  }

  getAllTasks(userId: string, itemPerPage: number, current: number): Observable<TaskAll> {
    try {
      const url = `?userId=${userId}&pagesize=${itemPerPage}&page=${current}`;
      return this.http.get<TaskAll>(ApiEndpoints.taskEndpoints.getAllData + url);
    } catch (e) {
      console.error(e);
    }
  }

}
