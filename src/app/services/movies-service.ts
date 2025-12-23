import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private baseUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getMovies(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post(this.baseUrl, movie, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, movie, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}
