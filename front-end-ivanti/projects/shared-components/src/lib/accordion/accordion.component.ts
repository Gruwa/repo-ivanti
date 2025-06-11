import {ChangeDetectionStrategy, Component, inject, input, output, signal} from '@angular/core';
import {
  MatExpansionModule
} from '@angular/material/expansion';
import {UserInterface} from '../../../../../src/app/shared/interfaces/user-interface';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../button/button.component';
import {UserService} from '../../../../../src/app/shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-accordion',
  imports: [
    MatExpansionModule,
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {

  userService = inject(UserService);
  router = inject(ActivatedRoute);
  /**
   * The panelOpenState signal is used to track the open state of the accordion panel.
   * It is initialized to false, indicating that the panel is closed by default.
   * @type {signal<boolean>}
   */
  readonly panelOpenState = signal(false);

  /**
   * The accordionTitle input is a string that represents the title of the accordion.
   * It is marked as required, meaning it must be provided by the parent component.
   * @input {string} accordionTitle - The title of the accordion.
   */
  accordionTitle = input<string>('');

  /**
   * The users input is an array of UserInterface objects that will be displayed in the accordion.
   * It is marked as required, meaning it must be provided by the parent component.
   * @input {Array<UserInterface>} users - The list of users to be displayed in the accordion.
   */
  users = input.required<Array<UserInterface>>();

  /**
   * The afterExpand output is an event emitter that emits a number when the accordion is expanded.
   * This can be used to trigger actions in the parent component when the accordion is opened.
   * @output {number} afterExpand - Emits a number when the accordion is expanded.
   */
  onOpen = output<number>();

  /**
   * The opened method is called when the accordion panel is opened.
   * @param id
   */
  opened(id: number) {
    this.panelOpenState.set(true);
    this.onOpen.emit(id);
  }

  /**
   * The cmethod to save route link inthe signal thta allow to navigate to the parent route.
   */
  onClick() {
    if (this.router.snapshot.url[1]) {
      this.userService.parentRouter.set('/' + this.router.snapshot.url[0].path + '/' + this.router.snapshot.url[1].path)
    } else {
      this.userService.parentRouter.set('/' + this.router.snapshot.url[0].path);
    }
  }
}
