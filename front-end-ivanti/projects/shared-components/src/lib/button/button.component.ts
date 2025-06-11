import {Component, input, output} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lib-button',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /**
   * The URL to navigate to when the button is clicked.
   * If not provided, the button will not navigate anywhere.
   *
   */
  link = input<string>('');

  /**
   * The text to display on the button.
   * Defaults to 'Button' if not provided.
   *
   */
  description = input<string>('Button');

  /**
   * The action to perform when the button is clicked.
   * If not provided, the button will not perform any action.
   * @output {EventEmitter<void>} action - The event emitter that emits when the button is clicked.
   */
  action = output();

  /**
   * Determines if the button should be disabled.
   * Defaults to false, meaning the button is enabled.
   */
  onClick() {
    this.action.emit();
  }
}
