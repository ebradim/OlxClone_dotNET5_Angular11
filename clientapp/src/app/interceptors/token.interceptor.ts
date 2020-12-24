import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const xtoken = document.cookie
      .split(';')
      .find((x) => x.includes('_fid'))
      ?.split('=')[1];
    if (!xtoken) {
      return next.handle(req);
    }
    const request = req.clone({
      headers: req.headers.set('X-Token', xtoken),
    });
    return next.handle(request);
  }
}
