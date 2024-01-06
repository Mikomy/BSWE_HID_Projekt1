
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KindergartenService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getKindergartens(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/kindergardens`);
  }

  getKindergartenById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/kindergardens/${id}`);
  }
}