import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Art, CreateArtDto, UpdateArtDto } from '../models/art.model';
import { inject, Injectable, input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class ArtService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/arts'; // this should be read from an env variable we will leave it for now.
  private readonly router = inject(Router);



  getArts(): Observable<Art[]> {
    return this.http
      .get<Art[]>(this.apiUrl)
    // .pipe(catchError((err) => this.handleError(err)));
  }

  getArtById(id: string): Observable<Art> {
    return this.http.get<Art>(`${this.apiUrl}/${id}`)
    // .pipe(catchError((err) => this.handleError(err)));
  }

  addArt(art: CreateArtDto): Observable<Art> {
    return this.http.post<Art>(this.apiUrl, art)
    // .pipe(
    //   catchError((err) => this.handleError(err))
    // )
  }
  updateArt(id: string, changes: UpdateArtDto): Observable<Art> {
    return this.http.put<Art>(`${this.apiUrl}/${id}`, changes);
  }
  deleteArt(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}