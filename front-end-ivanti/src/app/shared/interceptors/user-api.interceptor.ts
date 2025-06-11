import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs';
import {UserInterface} from '../interfaces/user-interface';
import {EUserLisType} from '../enums/user-enum';

/**
 * Interceptor for filtering users based on type and pagination.
 * @param req
 * @param next
 * @return Observable<HttpResponse<UserInterface[]>>
 */
export const userApiInterceptor: HttpInterceptorFn = (req, next) => {
  let type = req.params.get('type');
  let page: number = +(req.params.get('page') || '0') + 1;
  let size: number = +(req.params.get('size') || '15');

  return next(req)
    .pipe(
      map((response) => {
        if (req.url.indexOf('users') >= 0 && response instanceof HttpResponse && response.body && Array.isArray(response.body)) {
          let value: (UserInterface | null)[] = response.body as UserInterface[];

          if (type === EUserLisType.ODD) {
            value = value.filter(m => (m as UserInterface).id <= 25 && ((m as UserInterface).id % 2 !== 0));
          } else if (type === EUserLisType.EVEN) {
            value = value.filter(m => (m as UserInterface).id <= 25 && ((m as UserInterface).id % 2 === 0));
          } else if (type === EUserLisType.FULL && req.url.indexOf('typicode') < 0) {
            value = value.filter((m) => (m as UserInterface).id <= size * page);

            if (page > 1) {
              value = value.filter((m) => (m as UserInterface).id >= ((size * page) - size));
            }
          }
          response = response.clone({body: value});
        }
        return response;
      }),
      // delayWhen(() => timer(4000))
    );
};
