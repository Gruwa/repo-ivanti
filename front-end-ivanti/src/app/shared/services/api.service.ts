import {inject, Injectable} from '@angular/core';
import {UserInterface} from '../interfaces/user-interface';
import {Observable} from 'rxjs';
import {BaseApiService} from './base-api.service';
import {EUserAPI, EUserMessageAPI} from '../enums/user-enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiService = inject(BaseApiService);

  getUser(userId: string): Observable<UserInterface> {
    return this.baseApiService.getData(EUserAPI.OUTSOURCE, {userId: userId});
  }

  getInternalUser(userId: string): Observable<UserInterface> {
    return this.baseApiService.getData(EUserAPI.INTERNALSORCE, {userId: userId});
  }

  /**
   * Method for getting outsource users
   * @param parameter
   * @return Observable of UserInterface array
   */
  getOutsourceUsers(parameter: {}): Observable<Array<UserInterface>> {
    return this.baseApiService.getData(EUserAPI.OUTSOURCE, parameter);
  }

  /**
   * Method for getting internal users
   * @param parameter
   * @return Observable of UserInterface array
   */
  getInternalUsers(parameter: {}): Observable<Array<UserInterface>> {
    return this.baseApiService.getData(EUserAPI.INTERNALSORCE, parameter);
  }

  /**
   * Method for getting outsource users messages
   * @param parameter
   * @return Observable of UserInterface array
   */
  getOutsourceUsersMessage(parameter: {}): Observable<Array<UserInterface>> {
    return this.baseApiService.getData(EUserMessageAPI.OUTSOURCE, parameter);
  }

  /**
   * Method for getting internal users messages
   * @param parameter
   * @return Observable of UserInterface array
   */
  getInternalUsersMessage(parameter: {}): Observable<Array<UserInterface>> {
    return this.baseApiService.getData(EUserMessageAPI.INTERNALSORCE, parameter);
  }
}
