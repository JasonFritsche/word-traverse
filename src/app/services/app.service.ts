import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  generateRGBColor() {
    const numba = () => Math.floor(Math.random() * 190) + 1;
    return `rgb(${numba()}, ${numba()}, ${numba()})`;
  }
}
