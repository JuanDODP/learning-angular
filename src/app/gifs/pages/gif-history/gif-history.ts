import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from 'rxjs';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  term = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['term'])));
  gifService = inject(GifsService)
  gifsByKey= computed(() => {
    const term = this.term();
    return term ? this.gifService.getHistoryGifs(this.term()) : [];
  });
}
