import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies-popular`)
  }

}
