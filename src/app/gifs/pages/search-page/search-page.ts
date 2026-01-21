import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {
   gifSearch = inject(GifsService)
   gifs = signal<Gif[]>([])
  onSearch(term: string) {
    console.log('Buscando:', term);
    this.gifSearch.searchGifs(term).subscribe((response) => {
      // const gifs = response.data.map(gifData => ({
      //   id: gifData.id,
      //   title: gifData.title,
      //   url: gifData.images.fixed_height.url
      // }));
      // this.gif.set(gifs);
      // console.log('RESULTADOS DE LA BUSQUEDA', response);
      this.gifs.set(response);
    });
  }


}
