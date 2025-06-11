import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {CardInterface} from '../../../../../src/app/shared/interfaces/card-interface';

@Component({
  selector: 'lib-card',
  imports: [
    MatCardModule, MatChipsModule, MatProgressBarModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  /**
   * The card input is required and should be provided by the parent component.
   * * @input {CardInterface} card - The card data to be displayed in the component.
   */
  card = input<CardInterface>();
}
