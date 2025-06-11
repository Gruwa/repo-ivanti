import {inject, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, shareReplay, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/**
 * Interface for request parameters.
 * This interface defines the structure of the parameters that can be passed to API requests.
 * Each parameter can be a string or an array of strings.
 * @interface IRequestParameters
 * @property {string} [param] - The name of the parameter.
 * @property {string | string[]} [param] - The value of the parameter, which can be a single string or an array of strings.
 */
export interface IRequestParameters {
  [param: string]: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  public loader = signal<boolean>(false);

  constructor() { }

  /**
   * Variable
   * @protected
   */
  protected readonly http: HttpClient = inject(HttpClient);

  /**
   * General api method for getting data from the API.
   * @param url - The URL to send the GET request to.
   * @param parameters - Optional parameters to include in the request.
   * @return An Observable that emits the response from the API.
   * @private
   */
  private get(url: string, parameters?: IRequestParameters): Observable<any> {
    this.loader.set(true);
    return this.http.get(url, { params: parameters })
      .pipe(
        shareReplay(1),
        catchError(error => {
          this.loaderOff(error);
          return throwError(error);
        }),
      );
  }

  /**
   * General api method for getting data from the API.
   * @param url
   * @param parameters
   * @return An Observable that emits the response from the API.
   */
  getData(url: string, parameters?: IRequestParameters): Observable<any> {
    return this.get(url, parameters);
  }

  /**
   * General api method for deleting data from the API.
   * @param url - The URL to send the DELETE request to.
   * @param parameters - Optional parameters to include in the request.
   * @return An Observable that emits the response from the API.
   * @private
   */
  private delete(url: string, parameters?: IRequestParameters): Observable<any> {
    this.loader.set(true);
    return this.http.delete(url, { params: parameters })
      .pipe(
        shareReplay(1),
        catchError(error => {
          this.loaderOff(error);
          return throwError(error);
        }),
      );
  }

  /**
   * General api method for deleting data from the API.
   * @param url
   * @param parameters
   * @return An Observable that emits the response from the API.
   */
  deleteData(url: string, parameters?: IRequestParameters): Observable<any> {
    return this.delete(url, parameters);
  }

  /**
   * General api method for patching data from the API.
   * @param url - The URL to send the PATCH request to.
   * @param body - The body of the request, if any.
   * @param parameters - Optional parameters to include in the request.
   * @return An Observable that emits the response from the API.
   * @private
   */
  private patch(url: string, body?: any, parameters?: IRequestParameters): Observable<any> {
    this.loader.set(true);
    return this.http.patch(url, body, { params: parameters })
      .pipe(
        catchError(error => {
          this.loaderOff(error);
          return throwError(error);
        }),
      );
  }

  /**
   * General api method for patching data from the API.
   * @param url
   * @param parameters
   * @param body - The body of the request, if any.
   * @return An Observable that emits the response from the API.
   */
  patchData(url: string, body?: any, parameters?: IRequestParameters): Observable<any> {
    return this.patch(url, body, parameters);
  }

  /**
   * General api method for posting data from the API.
   * @param url - The URL to send the POST request to.
   * @param body - The body of the request, if any.
   * @param parameters - Optional parameters to include in the request.
   * @return An Observable that emits the response from the API.
   * @private
   */
  private post(url: string, body?: any, parameters?: IRequestParameters): Observable<any> {
    this.loader.set(true);
    return this.http.post(url, body, { params: parameters })
      .pipe(
        catchError(error => {
          this.loaderOff(error);
          return throwError(error);
        }),
      );
  }

  /**
   * General api method for posting data from the API.
   * @param url
   * @param body - The body of the request, if any.
   * @param parameters - Optional parameters to include in the request.
   * @return An Observable that emits the response from the API.
   */
  postData(url: string, body?: any, parameters?: IRequestParameters): Observable<any> {
    return this.post(url, body, parameters);
  }

  /**
   * Method to control error response and turn off the loader.
   * @param error
   * @private
   */
  private loaderOff(error?: any) {
    this.loader.set(false);
    // this.popup.message$ = (error && error.error && error.error.Errors)
    //   ? error.error.Errors[0].Title + ' ' + error.error.Errors[0].Details[0]
    //   : 'Failed request!';
  }
}
