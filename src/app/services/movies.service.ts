import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';
import { Favorite } from '../models/favorite';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies-popular`);
  }

  getFavoritesByUserId(userId: number) {
    return this.http
      .get<Favorite[]>(`${this.apiUrl}/favorites`)
      .pipe(
        map((favorites) =>
          favorites
            .filter((fav) => fav.userId === userId)
        )
      );
  }

  updateFavorite(
    movieId: number,
    userId: number,
    deleteMode?: boolean,
    favId?: number
  ) {
    console.warn('deleteMode', deleteMode);
    

    return deleteMode
      ? this.http.delete(`${this.apiUrl}/favorites/${favId}`)
      : this.http.post(`${this.apiUrl}/favorites/`, {
          userId,
          movieId,
        });
  }
}
