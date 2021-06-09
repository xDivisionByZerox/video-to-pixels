import { clamp } from '../util/clamp';

export interface IPixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

const min = 0;
const max = 255;

export class Pixel implements IPixel {

  alpha: number;
  blue: number;
  green: number;
  red: number;

  constructor(params: Partial<IPixel>) {
    const {
      alpha = min,
      blue = min,
      green = min,
      red = min,
    } = params;

    this.alpha = this.clamp(alpha);
    this.blue = this.clamp(blue);
    this.green = this.clamp(green);
    this.red = this.clamp(red);
  }

  private clamp(value: number): number {
    return clamp({ min, max, value });
  }

  toCssString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  clone(): Pixel {
    return new Pixel({
      alpha: this.alpha,
      blue: this.blue,
      green: this.green,
      red: this.red,
    });
  }

}