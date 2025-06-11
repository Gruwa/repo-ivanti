import { Injectable } from '@angular/core';
import {UserInterface} from '../interfaces/user-interface';
import {CardInterface} from '../interfaces/card-interface';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  /**
   * This method updates the user list with new messages.
   * It takes an array of users, a user ID, and an array of messages.
   * @param users
   * @param data
   * @param result
   * @return {UserInterface[]} - Returns the updated list of users with their messages.
   */
  updateUserLists(users: UserInterface[], data:  number, result: CardInterface[]): UserInterface[] {
    return users.map(user => {
      if (user.id === data) {
        return {...user, messages: result.filter(message => message.userId === user.id)};
      }
      return user;
    });
  }

  constructor() { }
}
