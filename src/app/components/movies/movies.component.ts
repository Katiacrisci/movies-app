import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from '../../auth/auth.data';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCoffee, faH, faV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  moviesMap!: Map<number, Movie>;
  userFavIds!: number[];
  user!: AuthData | null;

  regularHeart = faHeart;

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((_user) => (this.user = _user));

    this.moviesService.getAll().subscribe((response) => {
      this.moviesMap = new Map(
        response.map((movie) => {
          return [movie.id, movie];
        })
      );
      console.log('moviesMap', this.moviesMap);
    });

    this.moviesService
      .getFavoritesByUserId(this.user!.user.id)
      .subscribe((favoriteMovies) => {
        this.userFavIds = favoriteMovies.map((fav) => fav.movieId);
        this.userFavIds.forEach((movieId) => {
          this.moviesMap.get(movieId)!.isUserFavorite = true;
          this.moviesMap.get(movieId)!.favId = favoriteMovies.find(
            (favMovie) => favMovie.movieId === movieId
          )!.id;
        });
        this.movies = [...this.moviesMap.values()];
      });
  }

  toggleUserFavorite(movieId: number, favId?: number) {
    console.log('toggling favorite', movieId);
    const deleteMode = favId ? true : false;

    this.moviesService
      .updateFavorite(movieId, this.user!.user.id, deleteMode, favId)
      .subscribe((res) => {
        console.warn('response', res);
        this.movies.find((movie) => movie.id === movieId)!.isUserFavorite =
          !deleteMode;
      });
  }
}
