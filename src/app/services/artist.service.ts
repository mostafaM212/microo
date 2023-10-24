import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Artist } from '../models/artist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  artists$ = new BehaviorSubject<Artist[]>([]);
  baseUrl: string = environment.backendUrl + 'artists';
  constructor(private http: HttpClient) {}

  getArtists() {
    return this.http.get<{ message: string; artists: Artist[] }>(this.baseUrl);
  }
  getArtist(id: string) {
    return this.http.get<{ message: string; artist: any[] }>(
      this.baseUrl + '/' + id
    );
  }
  addArtist(data: FormData) {
    return this.http.post<{ message: string; artist: Artist }>(
      this.baseUrl,
      data
    );
  }
  updateArtist(id: string, data: Artist) {
    return this.http.put<{ message: string; artist: Artist }>(
      this.baseUrl + '/' + id,
      data
    );
  }
  deleteArtist(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
