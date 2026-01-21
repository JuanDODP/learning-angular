import { Gif } from "../interfaces/gif.interface";
import {  GophyItem } from "../interfaces/giphy.interface";

export class GifMapper {
  static toGif(item: GophyItem): Gif {
          return {
              id: item.id,
              title: item.title,
              url: item.images.fixed_height.url
          };
  }
  static toGifList(items: GophyItem[]): Gif[] {
          return items.map(GifMapper.toGif);
  }
}
