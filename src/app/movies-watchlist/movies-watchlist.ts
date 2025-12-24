import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-watchlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies-watchlist.html'
})
export class MoviesWatchlist implements OnInit {
  movies: any[] = [];
  editMovieData: any = null; // null si aucun film en édition
  showAddForm = false; // <-- contrôle l'affichage du formulaire
  newMovie = { title: '', description: '', year: new Date().getFullYear() };
  error = '';
  success = '';

  constructor(
    private moviesService: MoviesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadMovies();
    }
  }

  loadMovies() {
    this.moviesService.getMovies().subscribe({
      next: res => this.movies = res,
      error: err => this.error = err.error?.error || 'Erreur lors du chargement'
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.error = '';
    this.success = '';
  }

  addMovie() {
    if (!this.newMovie.title || !this.newMovie.year) {
      this.error = 'Veuillez remplir le titre et l’année';
      return;
    }
    this.moviesService.addMovie(this.newMovie).subscribe({
      next: () => {
        this.success = 'Film ajouté !';
        this.newMovie = { title: '', description: '', year: new Date().getFullYear() };
        this.showAddForm = false; // fermer le formulaire après ajout
        this.loadMovies();
      },
      error: err => this.error = err.error?.error || 'Erreur lors de l’ajout'
    });
  }


editMovie(movie: any) {
  // ouvre le formulaire d'édition avec les valeurs existantes
  this.editMovieData = { ...movie }; // copie pour ne pas modifier la liste directement
  this.error = '';
  this.success = '';
}
updateMovie() {
  if (!this.editMovieData.title || !this.editMovieData.year) {
    this.error = 'Veuillez remplir le titre et l’année';
    return;
  }

  this.moviesService.updateMovie(this.editMovieData._id, {
    title: this.editMovieData.title,
    description: this.editMovieData.description,
    year: this.editMovieData.year
  }).subscribe({
    next: () => {
      this.success = 'Film modifié !';
      this.editMovieData = null; // ferme le formulaire
      this.loadMovies();
    },
    error: err => this.error = err.error?.error || 'Erreur lors de la modification'
  });
}

cancelEdit() {
  this.editMovieData = null;
  this.error = '';
  this.success = '';
}

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe({
      next: () => this.loadMovies(),
      error: err => this.error = err.error?.error || 'Erreur lors de la suppression'
    });
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
