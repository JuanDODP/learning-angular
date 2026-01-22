import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Importante para detectar el navegador
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // Inyectamos el ID de la plataforma

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  // Inicializamos el historial con la lógica de carga segura
  searchHistory = signal<Record<string, Gif[]>>(this.loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.getGifs();
  }

  // Efecto para guardar en LocalStorage
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());

    // Solo ejecutamos la escritura si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(GIF_KEY, historyString);
    }
  });

  private loadFromLocalStorage(): Record<string, Gif[]> {
    // Si estamos en el servidor (Node.js), no existe localStorage, retornamos objeto vacío
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }

    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY);
    if (gifsFromLocalStorage) {
      try {
        return JSON.parse(gifsFromLocalStorage);
      } catch (error) {
        console.error('Error parsing Gifs from LocalStorage', error);
        return {};
      }
    }
    return {};
  }

  getGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '250',
        rating: 'g'
      }
    }).subscribe((response) => {
      const gif = GifMapper.toGifList(response.data);
      this.trendingGifs.set(gif);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(term: string): Observable<Gif[]> {
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
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ...history,
          [term.toLocaleLowerCase()]: gifs
        }));
      })
    );
  }

  getHistoryGifs(term: string) {
    return this.searchHistory()[term.toLocaleLowerCase()] ?? [];
  }
}
