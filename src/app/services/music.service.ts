import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  musics$ = new BehaviorSubject<Music[]>([]);
  baseUrl: string = environment.backendUrl + 'musics';
  constructor(private http: HttpClient) {}

  getMusics() {
    return this.http.get<{ message: string; musics: Music[] }>(this.baseUrl);
  }
  getMusic(id: string) {
    return this.http.get<{ message: string; music: Music }>(
      this.baseUrl + '/' + id
    );
  }
  addMusic(data: FormData) {
    return this.http.post<{ message: string; music: Music }>(
      this.baseUrl,
      data,
      {
        reportProgress: true,
        responseType: 'json',
        observe: 'events',
      }
    );
  }
  updateMusic(id: string, data: Music) {
    return this.http.put<{ message: string; music: Music }>(
      this.baseUrl + '/' + id,
      data
    );
  }
  deleteMusics(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
