import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  postRequest<T>(path: string, data?: unknown): Observable<T> {
    return this.http.post<T>(path, data)
  }

  getRequest<T>(path: string): Observable<T> {
    return this.http.get<T>(path);
  }

  putRequest<T>(path: string, data?: unknown): Observable<T> {
    return this.http.put<T>(path, data);
  }

  deleteRequest<T>(path: string): Observable<T> {
    return this.http.delete<T>(path);
  }
}
