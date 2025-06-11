import {Directive, effect, ElementRef, inject, input} from '@angular/core';

/**
 * Directive to create a navigation link with a description.
 */
@Directive({
  selector: 'a[appNavigationLink]'
})
export class NavigationLinkDirective {

  /**
   * The description of the navigation link.
   * This is a signal that can be updated to change the link's text.
   * @input
   */
  description = input('Menu');

  /**
   * Reference to the host element (the anchor tag).
   * This is used to set the text and class of the link.
   * @private
   * @type {ElementRef<HTMLAnchorElement>}
   * @inject ElementRef
   */
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  /**
   * Constructor that sets up an effect to update the link's text and class
   * whenever the description changes.
   * @constructor
   */
  constructor() {
    effect(() => {
      const element = this.hostElementRef.nativeElement;
      element.text = this.description();
      element.className = "header__nav-link";
    })
  }
}
