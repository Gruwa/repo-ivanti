import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {MatTab, MatTabChangeEvent} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {combineLatest, filter, map, Observable, Subject, takeUntil} from 'rxjs';
import {UserInterface} from '../interfaces/user-interface';
import {PageEvent} from '@angular/material/paginator';
import {CardInterface} from '../interfaces/card-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  router = inject<Router>(Router);
  apiService = inject(ApiService);

  /**
   * Signal with tab state for the users list tab.
   * type: MatTabChangeEvent
   */
  usersListTab = signal<MatTabChangeEvent>({index: 0, tab: new MatTab()});
  navLinks = computed(() =>
    [
      {href: '/main', label: 'Main'},
      {href: '/users-list/' + this.usersListTab().index, label: 'Users List'},
      {href: '/full-users-list', label: 'Full Users List'}
    ]
  );
  usersListOdd = signal<UserInterface[]>([]);
  usersListEven = signal<UserInterface[]>([]);
  usersListFull = signal<UserInterface[]>([]);
  pagination = signal<PageEvent>({length: 1000, pageIndex: 0, pageSize: 15, previousPageIndex: 0});
  parentRouter = signal<string>('');

  getUsersMessagesListRequestSubject = new Subject<void>();

  constructor() {
    effect(() => {
      if (this.navLinks() && this.router.url.indexOf('users-list') >= 0) this.router.navigate(['/users-list/', this.usersListTab().index]);
    });
  }

  /**
   * Method for changing the users list tab.
   * @param param - The event that contains the new tab index bind with EUserLisTypeTab.
   * @returns Observable<UserInterface[]>
   */
  getUsersList(param: {}): Observable<UserInterface[]> {
    return combineLatest([
      this.apiService.getInternalUsers(param),
      this.apiService.getOutsourceUsers(param)
    ])
      .pipe(
        map((data: [UserInterface[], UserInterface[]]): UserInterface[] => {
          let result: UserInterface[] = [];

          if (this.pagination().pageIndex >= 1) {
            result = data[0].sort(
              (a, b) => a.id - b.id || a.name.localeCompare(b.name)
            );
          } else if (this.pagination().pageIndex < 1 || this.router.url.indexOf('/users-list') >= 0) {
            result = [...data[0], ...data[1]].sort(
              (a, b) => a.id - b.id || a.name.localeCompare(b.name)
            );
          }

          return result;
        })
      );
  }

  getUsersMessagesList(param: {}): Observable<CardInterface[]> {
    // this.getUsersMessagesListRequestSubject.next();
    console.log('log');

    return combineLatest([
      this.apiService.getInternalUsersMessage({}),
      this.apiService.getOutsourceUsersMessage({})
    ])
      .pipe(
        // takeUntil(this.getUsersMessagesListRequestSubject),
        map((data: [CardInterface[], CardInterface[]]): CardInterface[] => {
          return [...data[0], ...data[1]].sort(
            (a, b) => a.id - b.id)
        })
      );
  }
}
