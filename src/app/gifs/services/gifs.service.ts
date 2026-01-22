import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
{

}
@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  // Historial de busqueda de gifs
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.getGifs();
  }

  getGifs() {
    // Call the Giphy API to get gifs
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '250',
        rating: 'g'
      }
    }).subscribe((response) => {
      const gif = GifMapper.toGifList(response.data);
      this.trendingGifs.set(gif);
      console.log('LOS GIGS', gif);

    });
  }
  // ==========================================================================================
  searchGifs(term: string): Observable<Gif[]> {
    // To be implemented
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        q: term,
        api_key: environment.apiKey,
        limit: '250',
        rating: 'g'
      }
    }).pipe(
      map(({ data }) => data),
      map((item) => GifMapper.toGifList(item)),
      // Manejar historia de busqueda
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ...history,
          [term.toLocaleLowerCase()]: gifs
        }));
      })
    );
  }
  getHistoryGifs(term: string) {
    // To be implemented
    return this.searchHistory()[term.toLocaleLowerCase()] ??   [];
  }
}
