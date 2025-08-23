import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from 'src/environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  /*constructor(){
    this.loadTrendingGifs();
  }*/

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        offset: 0,
        rating: 'g'
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(gifs);
    })
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        q: query,
        api_key: environment.giphyApiKey,
        limit: 25,
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      //Historial
      tap(items => {
        this.searchHistory.update(history => ({
          ...history, [
          query.toLowerCase()]: items
        }));
      })
    );/*.subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      console.log(gifs);
    });*/
  }
}
