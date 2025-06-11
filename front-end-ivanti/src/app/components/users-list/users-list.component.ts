import {Component, computed, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AccordionComponent} from '../../../../projects/shared-components/src/lib/accordion/accordion.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {UserInterface} from '../../shared/interfaces/user-interface';
import {Subject, takeUntil} from 'rxjs';
import {EUserLisType, EUserLisTypeTab} from '../../shared/enums/user-enum';
import {DataUserService} from '../../shared/services/data-user.service';

/**
 * Component for displaying a list of users.
 * It uses the UserService to fetch and manage user data,
 * and displays the data in an accordion format with tabs for odd and even users.
 * It also handles pagination for the full list of users.
 * @component
 * @selector app-users-list
 * @imports AccordionComponent, MatTabsModule, MatPaginator
 * @templateUrl ./users-list.component.html
 * @styleUrl ./users-list.component.scss
 * @implements OnDestroy
 */
@Component({
  selector: 'app-users-list',
  imports: [
    AccordionComponent,
    MatTabsModule,
    MatPaginator
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnDestroy {
  /**
   * Signal to get the full list of users.
   * It is computed based on the current pagination state and the URL.
   */
  userService = inject(UserService);

  /**
   * Router instance to navigate between routes.
   */
  router = inject<Router>(Router);

  /**
   * Service to handle user data operations.
   * This service provides methods to update user lists based on messages received.
   */
  dataUserService = inject(DataUserService);

  /**
   * Subject to manage unsubscription from observables.
   * It is used to prevent memory leaks by unsubscribing when the component is destroyed.
   * @private
   */
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Signal to get the current pagination state.
   * It is used to manage the pagination of the full users list.
   */
  constructor() {
    effect(() => {
      if (this.conditionForUsersListFull()) {
        this.fullListUsers();
      }
    });
    effect(() => {
      if (this.conditionForUsersListOdd()) {
        this.userService.getUsersList({type: EUserLisType.ODD})
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(users => {
            this.userService.usersListOdd.set(users);
          });
      }
      if (this.conditionForUsersListEven()) {
        this.userService.getUsersList({type: EUserLisType.EVEN})
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe((users: UserInterface[]) => {
            this.userService.usersListEven.set(users);
          });
      }
    });
  }

  /**
   * Checks if the current URL is for the full users list and if the list is empty.
   * If true, it triggers the fetching of the full users list.
   * @returns {boolean} - True if the conditions are met, false otherwise.
   * @private
   */
  private conditionForUsersListFull(): boolean {
    return this.userService.pagination()
      && this.router.url.indexOf('/full-users-list') >= 0
      && this.userService.usersListFull().length === 0
  }

  /**
   * Checks if the current URL is for the odd users list and if the list is empty.
   * If true, it triggers the fetching of the odd users list.
   * @returns {boolean} - True if the conditions are met, false otherwise.
   * @private
   */
  private conditionForUsersListOdd(): boolean {
    return this.userService.usersListTab().index === EUserLisTypeTab.ODD
      && this.userService.usersListOdd().length === 0
      && this.router.url.indexOf('/users-list') >= 0
  }

  /**
   * Checks if the current URL is for the even users list and if the list is empty.
   * If true, it triggers the fetching of the even users list.
   * @returns {boolean} - True if the conditions are met, false otherwise.
   * @private
   */
  private conditionForUsersListEven(): boolean {
    return this.userService.usersListTab().index === EUserLisTypeTab.EVEN
      && this.userService.usersListEven().length === 0
      && this.router.url.indexOf('/users-list') >= 0
  }

  /**
   * Fetches the full list of users based on the current pagination state.
   * It updates the usersListFull signal with the fetched data.
   * @returns {void}
   */
  fullListUsers() {
    this.userService.getUsersList(
      {
        type: EUserLisType.FULL,
        page: this.userService.pagination().pageIndex,
        size: this.userService.pagination().pageSize
      }
    )
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((users: UserInterface[]) => {
        this.userService.usersListFull.set(users);
      });
  }

  /**
   * Handles the pagination event.
   * It updates the pagination state in the userService and fetches the full list of users.
   * @param {PageEvent} data - The pagination event data containing pageIndex and pageSize.
   */
  onPagination(data: PageEvent) {
    if (this.userService.pagination().pageIndex !== data.pageIndex
      || this.userService.pagination().pageSize !== data.pageSize) {
      this.userService.pagination.update(pldData => {
        return {
          ...pldData,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize
        };
      });
      this.fullListUsers();
    }
  }

  /**
   * Fetches user messages based on the provided data.
   * It updates the usersListFull, usersListOdd, and usersListEven signals with the fetched messages.
   * @param {number} data - The identifier for the user whose messages are to be fetched.
   */
  getUserMessages(data: number) {
    this.userService.getUsersMessagesListRequestSubject.next();

    this.userService.getUsersMessagesList({})
      .pipe(
        takeUntil(this.ngUnsubscribe),
        takeUntil(this.userService.getUsersMessagesListRequestSubject)
      )
      .subscribe(result => {
        this.userService.usersListFull.update(users => {
          return this.dataUserService.updateUserLists(users, data, result);
        });
        this.userService.usersListOdd.update(users => {
          return this.dataUserService.updateUserLists(users, data, result);
        });
        this.userService.usersListEven.update(users => {
          return this.dataUserService.updateUserLists(users, data, result);
        });

      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
