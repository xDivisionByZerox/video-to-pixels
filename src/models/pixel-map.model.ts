import { Pixel } from './pixel.model';
import { clamp } from '../util/clamp';

export class PixelMap {

  private readonly $map: Pixel[];
  readonly width: number;
  readonly height: number;

  get map() {
    return this.$map.map((pixel) => pixel.clone());
  }

  constructor(imageData: ImageData) {
    this.$map = this.imageDataTo1dArray(imageData);
    this.height = imageData.height;
    this.width = imageData.width;
  }

  private imageDataTo1dArray(imageData: ImageData): Pixel[] {
    const pixels: Pixel[] = [];
    for (let index = 0; index <= imageData.data.length - 1; index += 4) {
      pixels.push(new Pixel({
        red: imageData.data[index],
        green: imageData.data[index + 1],
        blue: imageData.data[index + 2],
        alpha: imageData.data[index + 3],
      }));
    }

    return pixels
  }

  getAs2dArray(): Pixel[][] {
    const pixels: Pixel[][] = [];
    for (let rowIndex = 0; rowIndex <= this.height - 1; rowIndex++) {
      const row: Pixel[] = [];

      for (let colIndex = 0; colIndex <= this.width - 1; colIndex++) {
        const pixel = this.$map[(rowIndex * this.width) + colIndex];
        if (pixel === undefined) {
          continue;
        }
        row.push(pixel.clone());
      }

      pixels.push(row);
    }

    return pixels;
  }

  getPixel({ row, col }: {
    row: number,
    col: number
  }): Pixel {
    const inBoundRow = clamp({
      min: 0,
      max: this.height - 1,
      value: row
    });
    const inBoundCol = clamp({
      min: 0,
      max: this.width - 1,
      value: col
    });

    const index = (inBoundRow * this.width) + inBoundCol;
    const pixel = this.map[index];
    if (pixel === undefined) {
      throw new Error('Got undefined pixel. This should never happen.');
    }

    return pixel;
  }

}