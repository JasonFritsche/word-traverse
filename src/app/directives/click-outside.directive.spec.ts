import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  const elementRef: ElementRef = {} as ElementRef;
  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
